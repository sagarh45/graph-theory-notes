import { ek, sortIds } from './graph.js';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const R = 17;

/* o: { nc:{id:cls}, ec:{key:cls}, nl:{id:html-text}, nlCls:{id:cls}, pad, edit, scale, bip:{id:0|1}, hideW } */
export function svgGraph(g, o = {}) {
  const nc = o.nc || {}, ec = o.ec || {}, nl = o.nl || {};
  const P = {};
  g.nodes.forEach((n) => (P[n.id] = n));
  const xs = g.nodes.map((n) => n.x), ys = g.nodes.map((n) => n.y);
  const pad = o.pad != null ? o.pad : 30;
  const loopsAt = new Set(g.edges.filter((e) => e.u === e.v).map((e) => e.u));
  const minX = Math.min(...xs, 0) - pad, maxX = Math.max(...xs, 0) + pad;
  const minY = Math.min(...ys, 0) - pad - (g.nodes.some((n) => loopsAt.has(n.id) && n.y === Math.min(...ys)) ? 46 : 0);
  const maxY = Math.max(...ys, 0) + pad + (Object.keys(nl).length ? 20 : 0);
  const vb = o.vb || [minX, minY, maxX - minX, maxY - minY];
  const W = o.width || vb[2];
  let s = `<svg class="g-svg${o.edit ? ' editing' : ''}" viewBox="${vb.join(' ')}" width="${Math.round(W * (o.scale || 1))}" role="img" aria-label="${esc(o.label || 'Graph with ' + g.nodes.length + ' vertices and ' + g.edges.length + ' edges')}">`;
  if (o.edit) s += `<rect class="bg-hit" x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}"/>`;

  // group parallel edges so they can curve apart
  const groups = {};
  g.edges.forEach((e, i) => {
    const k = String(e.u) < String(e.v) ? e.u + '|' + e.v : e.v + '|' + e.u;
    (groups[k] = groups[k] || []).push(i);
  });
  let edgesS = '', labelsS = '';
  g.edges.forEach((e, i) => {
    const key = ek(g, e.u, e.v);
    const cls = ec[key] || ec['#' + i] || '';
    const a = P[e.u], b = P[e.v];
    if (!a || !b) return;
    if (e.u === e.v) {
      const x = a.x, y = a.y - R;
      edgesS += `<path class="edge ${cls}" data-e="${i}" d="M${x - 9} ${y + 3} C ${x - 40} ${y - 54}, ${x + 40} ${y - 54}, ${x + 9} ${y + 3}" fill="none"/>`;
      if (g.directed) edgesS += arrowHead(x + 9, y + 3, x + 16, y - 10, cls);
      if (g.weighted && e.w != null && !o.hideW) labelsS += wLabel(x, y - 44, e.w, cls);
      return;
    }
    const k = String(e.u) < String(e.v) ? e.u + '|' + e.v : e.v + '|' + e.u;
    const grp = groups[k], idx = grp.indexOf(i), cnt = grp.length;
    let off = 0;
    if (cnt > 1) off = (idx - (cnt - 1) / 2) * 34;
    // keep a consistent side for curves regardless of direction
    const flip = String(e.u) < String(e.v) ? 1 : -1;
    const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy) || 1;
    const nx = (-dy / L) * flip, ny = (dx / L) * flip;
    const mx = (a.x + b.x) / 2 + nx * off, my = (a.y + b.y) / 2 + ny * off;
    // shorten to node border
    const sx = a.x + ((mx - a.x) / Math.hypot(mx - a.x, my - a.y)) * R, sy = a.y + ((my - a.y) / Math.hypot(mx - a.x, my - a.y)) * R;
    const tx = b.x + ((mx - b.x) / Math.hypot(mx - b.x, my - b.y)) * (R + (g.directed ? 2 : 0)), ty = b.y + ((my - b.y) / Math.hypot(mx - b.x, my - b.y)) * (R + (g.directed ? 2 : 0));
    let d;
    if (off) { const cx = 2 * mx - (a.x + b.x) / 2, cy = 2 * my - (a.y + b.y) / 2; d = `M${f(sx)} ${f(sy)} Q ${f(cx)} ${f(cy)} ${f(tx)} ${f(ty)}`; }
    else d = `M${f(sx)} ${f(sy)} L ${f(tx)} ${f(ty)}`;
    edgesS += `<path class="edge ${cls}" data-e="${i}" d="${d}" fill="none"/>`;
    if (o.edit) edgesS += `<path class="edge-hit" data-e="${i}" d="${d}" fill="none"/>`;
    if (g.directed) {
      const fx = off ? 2 * mx - (a.x + b.x) / 2 : sx, fy = off ? 2 * my - (a.y + b.y) / 2 : sy;
      edgesS += arrowHead(fx, fy, tx, ty, cls);
    }
    if (g.weighted && e.w != null && !o.hideW) { const t = g.directed && !off ? 0.42 : 0.5; labelsS += wLabel(off ? mx : a.x + (b.x - a.x) * t, off ? my : a.y + (b.y - a.y) * t, e.w, cls); }
  });
  s += `<g class="edges">${edgesS}</g><g class="wts">${labelsS}</g>`;
  g.nodes.forEach((n) => {
    const cls = nc[n.id] || '';
    const side = o.bip && o.bip[n.id] != null ? ' side' + o.bip[n.id] : '';
    s += `<g class="nd ${cls}${side}${o.edit || o.click ? ' clickable' : ''}" data-n="${esc(n.id)}" transform="translate(${n.x} ${n.y})"><circle r="${R}"/><text dy="5.5">${esc(n.id)}</text>`;
    if (nl[n.id] != null && nl[n.id] !== '') {
      const t = String(nl[n.id]), w = Math.max(18, t.length * 7.4 + 10);
      s += `<g class="nlab ${o.nlCls && o.nlCls[n.id] ? o.nlCls[n.id] : ''}"><rect x="${-w / 2}" y="${R + 3}" width="${w}" height="18" rx="9"/><text y="${R + 16}">${esc(t)}</text></g>`;
    }
    s += '</g>';
  });
  return s + '</svg>';
}
const f = (x) => Math.round(x * 10) / 10;
function arrowHead(fx, fy, tx, ty, cls) {
  const dx = tx - fx, dy = ty - fy, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
  const bx = tx - ux * 11, by = ty - uy * 11;
  return `<path class="arrow ${cls}" d="M${f(tx)} ${f(ty)} L ${f(bx - uy * 5.5)} ${f(by + ux * 5.5)} L ${f(bx + uy * 5.5)} ${f(by - ux * 5.5)} Z"/>`;
}
function wLabel(x, y, w, cls) {
  const t = String(w), wd = Math.max(20, t.length * 8 + 10);
  return `<g class="wl ${cls}"><rect x="${f(x - wd / 2)}" y="${f(y - 10)}" width="${wd}" height="20" rx="6"/><text x="${f(x)}" y="${f(y + 4.5)}">${esc(t)}</text></g>`;
}

/* ---------- representations ---------- */
export function adjMatrixHTML(g, hl = {}) {
  const V = g.nodes.map((n) => n.id);
  const M = {};
  V.forEach((a) => { M[a] = {}; V.forEach((b) => (M[a][b] = 0)); });
  g.edges.forEach((e) => {
    const val = g.weighted ? (e.w == null ? 1 : e.w) : null;
    if (g.weighted) { M[e.u][e.v] = val; if (!g.directed) M[e.v][e.u] = val; }
    else { M[e.u][e.v] += 1; if (!g.directed && e.u !== e.v) M[e.v][e.u] += 1; }
  });
  let h = '<table class="mx"><thead><tr><th class="corner">' + (g.directed ? 'from \\ to' : '') + '</th>' + V.map((v) => `<th data-c="${esc(v)}">${esc(v)}</th>`).join('') + '<th class="deg">' + (g.directed ? 'out' : 'deg') + '</th></tr></thead><tbody>';
  V.forEach((a) => {
    let rowSum = 0;
    h += `<tr><th data-r="${esc(a)}">${esc(a)}</th>`;
    V.forEach((b) => {
      const x = M[a][b];
      if (!g.weighted) rowSum += x; else if (x) rowSum++;
      const on = x !== 0;
      h += `<td class="${on ? 'on' : ''} ${hl[a + ',' + b] || ''}" data-u="${esc(a)}" data-v="${esc(b)}">${g.weighted && !on ? (a === b ? 0 : '∞') : x}</td>`;
    });
    h += `<td class="deg">${rowSum}</td></tr>`;
  });
  return h + '</tbody></table>';
}

export function adjListHTML(g, A) {
  return '<div class="alist">' + g.nodes.map((n) => {
    const list = A[n.id];
    return `<div class="al-row"><span class="al-head">${esc(n.id)}</span><span class="al-ptr">→</span>` +
      (list.length ? list.map((x, i) => `<span class="al-node"><b>${esc(x.v)}</b>${g.weighted ? `<i>${x.w}</i>` : ''}<span class="al-next">${i === list.length - 1 ? 'NULL' : ''}</span></span>${i < list.length - 1 ? '<span class="al-ptr">→</span>' : ''}`).join('') : '<span class="al-null">NULL</span>') +
      '</div>';
  }).join('') + '</div>';
}

export function incidenceHTML(g) {
  const V = g.nodes.map((n) => n.id);
  let h = '<table class="mx"><thead><tr><th class="corner"></th>' + g.edges.map((e, i) => `<th>e${i + 1}<small>${esc(e.u)}${g.directed ? '→' : '–'}${esc(e.v)}</small></th>`).join('') + '</tr></thead><tbody>';
  V.forEach((a) => {
    h += `<tr><th>${esc(a)}</th>` + g.edges.map((e) => {
      let x = 0;
      if (e.u === e.v && e.u === a) x = g.directed ? '±1' : 2;
      else if (g.directed) x = e.u === a ? 1 : e.v === a ? -1 : 0;
      else x = e.u === a || e.v === a ? 1 : 0;
      return `<td class="${x !== 0 ? (x === -1 ? 'on neg' : 'on') : ''}">${x}</td>`;
    }).join('') + '</tr>';
  });
  return h + '</tbody></table>';
}

export function edgeListHTML(g) {
  return '<table class="mx el"><thead><tr><th>#</th><th>' + (g.directed ? 'from' : 'u') + '</th><th>' + (g.directed ? 'to' : 'v') + '</th>' + (g.weighted ? '<th>weight</th>' : '') + '</tr></thead><tbody>' +
    g.edges.map((e, i) => `<tr><td>${i + 1}</td><td>${esc(e.u)}</td><td>${esc(e.v)}</td>${g.weighted ? `<td>${e.w == null ? 1 : e.w}</td>` : ''}</tr>`).join('') + '</tbody></table>';
}

export function chips(arr, cls = '', empty = 'empty') {
  return arr.length ? arr.map((x) => `<span class="${cls}">${esc(x)}</span>`).join('') : `<em>${empty}</em>`;
}

export { sortIds };
