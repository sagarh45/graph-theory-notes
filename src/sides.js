/* Side panels for each algorithm player */
import { esc } from './render.js';

const cells = (arr, cls = '') => (arr.length ? arr.map((x) => `<span class="${cls}">${esc(x)}</span>`).join('') : '<em>empty</em>');
const inf = (x) => (x === Infinity ? '∞' : x);

function visRow(V, vis) {
  return `<table class="arr"><tr class="ix"><th></th>${V.map((v) => `<td>${esc(v)}</td>`).join('')}</tr><tr><th>visited[ ]</th>${V.map((v) => `<td><span class="cell ${vis[v] ? 'on' : ''}">${vis[v] ? 1 : 0}</span></td>`).join('')}</tr></table>`;
}

export function bfsSide(s) {
  const all = s.qlog, f = s.front;
  const q = all.length ? `<div class="queue">${all.map((x, j) => `<span class="${j < f ? 'gone' : 'in'}">${esc(x)}${j === f && f < all.length ? '<i class="ptr f">F</i>' : ''}${j === all.length - 1 && f < all.length ? '<i class="ptr r">R</i>' : ''}</span>`).join('')}</div>` : '<div class="queue"><em>empty</em></div>';
  return `<div class="sb"><span class="lbl">Queue <small>(front → rear; grey = already removed)</small></span>${q}</div>
  <div class="sb"><span class="lbl">Visited</span>${visRow(s.V, s.vis)}</div>
  <div class="sb"><span class="lbl">Output (BFS order)</span><div class="outv">${cells(s.out)}</div></div>`;
}

export function dfsSide(s) {
  return `<div class="sb"><span class="lbl">Call stack <small>(top on the right)</small></span><div class="stackv">${cells(s.stack)}${s.stack.length ? '<i class="top">← top</i>' : ''}</div></div>
  <div class="sb"><span class="lbl">Visited</span>${visRow(s.V, s.vis)}</div>
  <div class="sb"><span class="lbl">Output (DFS order)</span><div class="outv">${cells(s.out)}</div></div>`;
}

export function primSide(s) {
  return `<div class="sb"><span class="lbl">Prim table · MST weight so far = <b>${s.total}</b></span><table class="t mini"><thead><tr><th>Vertex</th><th>key</th><th>parent</th><th>in tree</th></tr></thead><tbody>${s.V.map((v) =>
    `<tr class="${s.hot === v ? 'hot' : ''} ${s.inT[v] ? 'fixed' : ''}"><td><b>${esc(v)}</b></td><td>${inf(s.key[v])}</td><td>${s.par[v] == null ? '–' : esc(s.par[v])}</td><td>${s.inT[v] ? '✓' : ''}</td></tr>`).join('')}</tbody></table></div>`;
}

export function kruskalSide(s) {
  return `<div class="sb"><span class="lbl">Edges sorted by weight · total = <b>${s.total}</b></span><div class="elist">${s.E.map((e) => {
    const st = s.status[e.i];
    return `<span class="ei ${st || ''} ${s.cur === e.i ? 'now' : ''}">${esc(e.u)}${esc(e.v)}<b>${e.w}</b>${st === 'tree' ? '✓' : st === 'rej' ? '✗' : ''}</span>`;
  }).join('')}</div></div>
  <div class="sb"><span class="lbl">Disjoint sets (union-find)</span><div class="sets">${s.sets.map((x) => `<span>{ ${x.map(esc).join(', ')} }</span>`).join('')}</div></div>`;
}

export function dijkstraSide(s) {
  const path = (t) => { const p = []; for (let x = t; x != null; x = s.prev[x]) p.unshift(x); return p[0] === s.s ? p.join('→') : '–'; };
  return `<div class="sb"><span class="lbl">Distance table</span><table class="t mini"><thead><tr><th>Vertex</th><th>dist</th><th>prev</th><th>final</th><th>path</th></tr></thead><tbody>${s.V.map((v) =>
    `<tr class="${s.hot === v ? 'hot' : ''} ${s.done[v] ? 'fixed' : ''}"><td><b>${esc(v)}</b></td><td>${inf(s.dist[v])}</td><td>${s.prev[v] == null ? '–' : esc(s.prev[v])}</td><td>${s.done[v] ? '✓' : ''}</td><td class="pth">${s.dist[v] === Infinity ? '–' : path(v)}</td></tr>`).join('')}</tbody></table></div>`;
}

export function topoSide(s) {
  return `<div class="sb"><span class="lbl">In-degree</span><table class="arr"><tr class="ix"><th></th>${s.V.map((v) => `<td>${esc(v)}</td>`).join('')}</tr><tr><th>in[ ]</th>${s.V.map((v) => `<td><span class="cell ${s.removed[v] ? 'on' : s.indeg[v] === 0 ? 'zero' : ''}">${s.removed[v] ? '✓' : s.indeg[v]}</span></td>`).join('')}</tr></table></div>
  <div class="sb"><span class="lbl">Queue (in-degree 0)</span><div class="stackv">${cells(s.queue)}</div></div>
  <div class="sb"><span class="lbl">Topological order</span><div class="outv">${cells(s.out)}</div></div>`;
}
