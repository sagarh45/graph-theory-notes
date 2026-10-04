import { svgGraph, esc } from './render.js';

export const REDUCED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Step player. render(frame) -> { stage: html, side: html } */
export function Player(host, frames, render, opts = {}) {
  let i = 0, timer = null, speed = 1;
  host.classList.add('player');
  host.innerHTML = `<div class="pl-grid${opts.sideFirst ? ' side-first' : ''}"><div class="stage"></div><div class="side"></div></div>
  <div class="ctrl"><button type="button" class="b-first" aria-label="First step">⏮</button><button type="button" class="b-prev">◀ Prev</button><button type="button" class="b-play primary">▶ Run</button><button type="button" class="b-next">Next ▶</button><button type="button" class="b-last" aria-label="Last step">⏭</button><button type="button" class="b-all" hidden>▦ All steps</button>
  <label class="spd">Speed <select aria-label="Animation speed"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="2">2×</option><option value="4">4×</option></select></label><span class="count"></span></div>
  <div class="progress"><span></span></div>
  <div class="msg" aria-live="polite"></div><div class="allsteps" hidden></div>`;
  const stage = host.querySelector('.stage'), side = host.querySelector('.side'), msg = host.querySelector('.msg'), cnt = host.querySelector('.count'), play = host.querySelector('.b-play');
  const bar = host.querySelector('.progress span'), allBtn = host.querySelector('.b-all'), allBox = host.querySelector('.allsteps');
  const keyFrames = () => frames.filter((f) => f.keyStep);
  function refreshAll() {
    const ks = keyFrames();
    allBtn.hidden = ks.length < 2;
    if (allBox.hidden) return;
    allBox.innerHTML = '<p class="hint">Key moments of the run, in order — what you would draw in the exam. Tap one to open it above.</p><div class="steps-grid">' + ks.map((f, j) =>
      `<button type="button" class="step-card" data-f="${frames.indexOf(f)}"><span class="sc-n">${j + 1}</span><div class="sc-fig">${render(f, true).stage}</div><span class="sc-cap">${esc(f.keyStep)}</span></button>`).join('') + '</div>';
    allBox.querySelectorAll('.step-card').forEach((bt) => { bt.onclick = () => { stop(); go(+bt.dataset.f); host.scrollIntoView({ block: 'nearest' }); }; });
  }
  allBtn.onclick = () => { allBox.hidden = !allBox.hidden; allBtn.classList.toggle('on', !allBox.hidden); allBtn.textContent = allBox.hidden ? '▦ All steps' : '▦ Hide steps'; refreshAll(); };
  function draw() {
    const f = frames[i];
    if (!f) { stage.innerHTML = ''; side.innerHTML = ''; msg.innerHTML = ''; cnt.textContent = ''; return; }
    const r = render(f, false);
    stage.innerHTML = r.stage; side.innerHTML = r.side || ''; side.hidden = !r.side;
    msg.innerHTML = f.msg;
    cnt.textContent = 'Step ' + (i + 1) + ' / ' + frames.length;
    bar.style.width = (frames.length > 1 ? (i / (frames.length - 1)) * 100 : 100) + '%';
    if (opts.onFrame) opts.onFrame(f, i);
  }
  function stop() { clearInterval(timer); timer = null; play.textContent = '▶ Run'; }
  function go(n) { i = Math.max(0, Math.min(frames.length - 1, n)); draw(); }
  function start() {
    if (timer) return stop();
    if (i >= frames.length - 1) { i = 0; draw(); }
    play.textContent = '❚❚ Pause';
    timer = setInterval(() => { if (i >= frames.length - 1) return stop(); i++; draw(); }, (REDUCED ? 1600 : 1250) / speed);
  }
  host.querySelector('.b-first').onclick = () => { stop(); go(0); };
  host.querySelector('.b-last').onclick = () => { stop(); go(frames.length - 1); };
  host.querySelector('.b-prev').onclick = () => { stop(); go(i - 1); };
  host.querySelector('.b-next').onclick = () => { stop(); go(i + 1); };
  play.onclick = start;
  host.querySelector('.spd select').onchange = function () { speed = +this.value; if (timer) { stop(); start(); } };
  host.tabIndex = -1;
  host.addEventListener('keydown', (e) => {
    if (e.target.closest('input,select,textarea')) return;
    if (e.key === 'ArrowRight') { stop(); go(i + 1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { stop(); go(i - 1); e.preventDefault(); }
    else if (e.key === ' ' && e.target === host) { start(); e.preventDefault(); }
  });
  draw(); refreshAll();
  return {
    set(fr, auto) { stop(); frames = fr; i = 0; draw(); refreshAll(); if (auto) start(); },
    last() { stop(); go(frames.length - 1); },
    stop,
  };
}

export function graphStage(g, f, small) {
  return svgGraph(g, { nc: f.nc, ec: f.ec, nl: f.nl, scale: small ? 0.5 : 1 });
}
