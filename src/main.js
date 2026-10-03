import './style.css';
import { mountFig, mountPlay, mountLab, mountRepr, mountExplorer, mountKn, mountChecker, mountHandshake, mountCode, mountRep, mountDry } from './widgets.js';
import { mountQuiz } from './quiz.js';
import { esc } from './render.js';
import { REDUCED } from './player.js';

const UNITS = ['basics', 'terms', 'types', 'repr', 'traversal', 'algos', 'revision'];
const mounted = {};
function mountUnit(id) {
  if (mounted[id]) return; mounted[id] = 1;
  const sec = document.getElementById(id);
  const run = (sel, fn) => sec.querySelectorAll(sel).forEach((el) => { try { fn(el); } catch (e) { console.error(sel, e); } });
  run('[data-fig]', mountFig);
  run('[data-play]', mountPlay);
  run('[data-lab]', mountLab);
  run('[data-repr]', mountRepr);
  run('[data-explorer]', mountExplorer);
  run('[data-kn]', mountKn);
  run('[data-checker]', mountChecker);
  run('[data-handshake]', mountHandshake);
  run('[data-rep]', mountRep);
  run('[data-dry]', mountDry);
  run('[data-quiz]', mountQuiz);
  run('pre.c', mountCode);
}
function buildToc(id) {
  const sec = document.getElementById(id), toc = document.getElementById('toc');
  toc.innerHTML = '<p class="toc-h">In this part</p>' + Array.from(sec.querySelectorAll('h3[id]')).map((h) => {
    const n = h.querySelector('.n'), t = h.textContent.slice(n ? n.textContent.length : 0);
    return `<a href="#${h.id}">${n ? `<span class="tn">${n.textContent}</span> ` : ''}${esc(t)}</a>`;
  }).join('');
  toc.querySelectorAll('a').forEach((a) => (a.onclick = (e) => { e.preventDefault(); document.getElementById(a.getAttribute('href').slice(1)).scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' }); }));
  spy(sec);
}
let obs = null;
function spy(sec) {
  if (obs) obs.disconnect();
  if (!('IntersectionObserver' in window)) return;
  obs = new IntersectionObserver((ents) => {
    ents.forEach((en) => {
      if (!en.isIntersecting) return;
      document.querySelectorAll('#toc a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-130px 0px -65% 0px' });
  sec.querySelectorAll('h3[id]').forEach((h) => obs.observe(h));
}
function show(id, scroll) {
  if (!UNITS.includes(id)) id = 'basics';
  UNITS.forEach((u) => {
    document.getElementById(u).hidden = u !== id;
    const t = document.querySelector(`.tabs a[href="#${u}"]`);
    t.classList.toggle('on', u === id);
    if (u === id) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
  });
  mountUnit(id); buildToc(id);
  const k = UNITS.indexOf(id), nav = document.getElementById('pager');
  const lab = (u) => document.querySelector(`.tabs a[href="#${u}"] .tl`).textContent;
  nav.innerHTML = (k > 0 ? `<a href="#${UNITS[k - 1]}" class="pg prev"><small>Previous</small>${lab(UNITS[k - 1])}</a>` : '<span></span>') + (k < UNITS.length - 1 ? `<a href="#${UNITS[k + 1]}" class="pg next"><small>Next</small>${lab(UNITS[k + 1])}</a>` : '<span></span>');
  try { localStorage.setItem('graphs-unit', id); } catch (e) { /* ignore */ }
  if (scroll) window.scrollTo(0, 0);
  const cur = document.querySelector('.tabs a.on');
  if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest', inline: 'center' });
}
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  if (UNITS.includes(id)) { e.preventDefault(); history.replaceState(null, '', '#' + id); show(id, true); return; }
  // link to a section inside another part
  const target = document.getElementById(id);
  const sec = target && target.closest('section.unit');
  if (sec && sec.hidden) { e.preventDefault(); history.replaceState(null, '', '#' + sec.id); show(sec.id, false); requestAnimationFrame(() => target.scrollIntoView({ block: 'start' })); }
});
window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (UNITS.includes(h)) show(h, true); });
(function init() {
  const h = location.hash.slice(1);
  let saved = null;
  try { saved = localStorage.getItem('graphs-unit'); } catch (e) { /* ignore */ }
  if (UNITS.includes(h)) show(h, false);
  else {
    const t = h && document.getElementById(h), sec = t && t.closest('section.unit');
    if (sec) { show(sec.id, false); requestAnimationFrame(() => t.scrollIntoView({ block: 'start' })); }
    else show(saved || 'basics', false);
  }
})();
