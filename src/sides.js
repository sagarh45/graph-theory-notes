/* Side panels for each algorithm player */
import { esc } from './render.js';

const cells = (arr, cls = '') => (arr.length ? arr.map((x) => `<span class="${cls}">${esc(x)}</span>`).join('') : '<em>empty</em>');
const inf = (x) => (x === Infinity ? '∞' : x);

function visRow(V, vis) {
  return `<table class="arr"><tr class="ix"><th></th>${V.map((v) => `<td>${esc(v)}</td>`).join('')}</tr><tr><th>visited[ ]</th>${V.map((v) => `<td><span class="cell ${vis[v] ? 'on' : ''}">${vis[v] ? 1 : 0}</span></td>`).join('')}</tr></table>`;
}

function queueDraw(items) {
  if (!items.length) return '<div class="qdraw"><div class="qempty">empty</div></div>';
  return `<div class="qdraw"><span class="qop">dequeue</span><div class="qboxes">${items.map((x, i) => {
    const tags = (i === 0 ? '<i class="f">front</i>' : '') + (i === items.length - 1 ? '<i class="r">rear</i>' : '');
    return `<span class="qbox">${esc(x)}${tags}</span>`;
  }).join('')}</div><span class="qop">enqueue</span></div>`;
}
function stackDraw(items) {
  if (!items.length) return '<div class="sdraw"><div class="sempty">empty</div></div>';
  return `<div class="sdraw">${items.map((x, i) => `<div class="sbox${i === items.length - 1 ? ' top' : ''}">${esc(x)}${i === items.length - 1 ? '<i>← top</i>' : ''}</div>`).join('')}</div>`;
}
export function bfsSide(s) {
  const all = s.qlog || [], f = s.front || 0;
  const live = all.slice(f), left = all.slice(0, f);
  return `<div class="sb"><span class="lbl">Queue <small>front leaves · rear joins</small></span>${queueDraw(live)}${left.length ? `<p class="hint">Already dequeued: ${left.map(esc).join(' ')}</p>` : ''}</div>
  <div class="sb"><span class="lbl">Visited</span>${visRow(s.V, s.vis)}</div>
  <div class="sb"><span class="lbl">What the program prints</span><pre class="runline">BFS order: ${esc((s.out || []).join(' '))}${(s.out || []).length ? ' ▍' : ''}</pre></div>`;
}

export function dfsSide(s) {
  return `<div class="sb"><span class="lbl">Stack <small>top is popped first</small></span>${stackDraw(s.stack || [])}</div>
  <div class="sb"><span class="lbl">Visited</span>${visRow(s.V, s.vis)}</div>
  <div class="sb"><span class="lbl">What the program prints</span><pre class="runline">DFS order: ${esc((s.out || []).join(' '))}${(s.out || []).length ? ' ▍' : ''}</pre></div>`;
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

/* ---------- Part 7 side panels ---------- */
const sw = (c) => `<i class="sw k${c % 6}"></i>`;
export function bellmanSide(s) {
  return `<div class="sb"><span class="lbl">Pass ${s.pass || 0} of ${s.V.length - 1} · edge order</span><div class="elist">${s.E.map((e, i) =>
    `<span class="ei ${s.cur === i ? 'now' : ''}">${esc(e.u)}→${esc(e.v)}<b>${e.w}</b></span>`).join('')}</div></div>
  <div class="sb"><span class="lbl">Distance table</span><table class="t mini"><thead><tr><th>Vertex</th><th>dist</th><th>prev</th></tr></thead><tbody>${s.V.map((v) =>
    `<tr class="${s.hot === v ? 'hot' : ''} ${s.bad && s.bad.includes(v) ? 'badrow' : ''}"><td><b>${esc(v)}</b></td><td>${inf(s.dist[v])}</td><td>${s.prev[v] == null ? '–' : esc(s.prev[v])}</td></tr>`).join('')}</tbody></table></div>`;
}
export function floydSide(s) {
  const V = s.V;
  return `<div class="sb"><span class="lbl">Distance matrix D${s.k ? ' · k = ' + esc(s.k) : ''}</span><table class="fw"><thead><tr><th></th>${V.map((j) => `<th class="${j === s.k ? 'kk' : ''}">${esc(j)}</th>`).join('')}</tr></thead><tbody>${V.map((i) =>
    `<tr><th class="${i === s.k ? 'kk' : ''}">${esc(i)}</th>${V.map((j) => {
      const c = [i === s.k || j === s.k ? 'kline' : '', s.changed[i + '|' + j] ? 'chg' : '', s.i === i && s.j === j ? 'now' : '', i === j ? 'dg' : ''].join(' ');
      return `<td class="${c}">${inf(s.D[i][j])}</td>`;
    }).join('')}</tr>`).join('')}</tbody></table>
  <p class="hint">Grey band = row and column k (they are the “via” values). Shaded = improved in this round.</p></div>`;
}
export function cycleSide(s) {
  const nm = s.directed ? ['W', 'G', 'B'] : ['0', '1', '1'];
  return `<div class="sb"><span class="lbl">${s.directed ? 'Colour: W white · G grey · B black' : 'visited[ ] and parent[ ]'}</span><table class="arr"><tr class="ix"><th></th>${s.V.map((v) => `<td>${esc(v)}</td>`).join('')}</tr><tr><th>${s.directed ? 'colour' : 'visited'}</th>${s.V.map((v) => `<td><span class="cell ${s.col[v] === 1 ? 'gry' : s.col[v] === 2 ? 'on' : ''}">${nm[s.col[v]]}</span></td>`).join('')}</tr>
  <tr><th>parent</th>${s.V.map((v) => `<td><span class="cell">${s.par[v] == null ? '–' : esc(s.par[v])}</span></td>`).join('')}</tr></table></div>
  <div class="sb"><span class="lbl">Current DFS path <small>(grey vertices)</small></span><div class="stackv">${cells(s.stack)}</div></div>
  ${s.cyc ? `<div class="sb bad"><span class="lbl">Cycle</span><div class="outv">${cells(s.cyc.concat(s.cyc[0]))}</div></div>` : ''}`;
}
export function bipSide(s) {
  const X = s.V.filter((v) => s.side[v] === 0), Y = s.V.filter((v) => s.side[v] === 1);
  return `<div class="sb"><span class="lbl">Queue</span><div class="stackv">${cells(s.queue)}</div></div>
  <div class="sb"><span class="lbl">Group X (white)</span><div class="outv xg">${cells(X)}</div></div>
  <div class="sb"><span class="lbl">Group Y (dark)</span><div class="outv yg">${cells(Y)}</div></div>`;
}
export function compSide(s) {
  return `<div class="sb"><span class="lbl">Components found: ${s.comps.length}</span><div class="sets">${s.comps.map((c, i) => `<span>${sw(i)}C${i + 1} = { ${c.map(esc).join(', ')} }</span>`).join('') || '<em>none yet</em>'}</div></div>`;
}
export function bridgeSide(s) {
  return `<div class="sb"><span class="lbl">disc / low / parent</span><table class="t mini"><thead><tr><th>Vertex</th><th>disc</th><th>low</th><th>parent</th></tr></thead><tbody>${s.V.map((v) =>
    `<tr class="${s.hot === v ? 'hot' : ''} ${s.cut.includes(v) ? 'badrow' : ''}"><td><b>${esc(v)}</b></td><td>${s.disc[v] ?? '–'}</td><td>${s.low[v] ?? '–'}</td><td>${s.par[v] == null ? '–' : esc(s.par[v])}</td></tr>`).join('')}</tbody></table></div>
  <div class="sb"><span class="lbl">Bridges</span><div class="outv">${cells(s.bridges.map((x) => x.join('–')))}</div></div>
  <div class="sb"><span class="lbl">Cut vertices</span><div class="outv">${cells(s.cut)}</div></div>`;
}
export function sccSide(s) {
  return `<div class="sb"><span class="lbl">${s.phase === 1 ? 'Pass 1 · DFS on G' : 'Pass 2 · DFS on Gᵀ (reversed edges)'}</span><p class="hint" style="margin:0">${s.phase === 1 ? 'Record finish order.' : 'Pop from the finish stack (right end first).'}</p></div>
  <div class="sb"><span class="lbl">Finish stack <small>(top on the right)</small></span><div class="stackv">${cells(s.fin)}</div></div>
  <div class="sb"><span class="lbl">SCCs</span><div class="sets">${s.comps.map((c, i) => `<span>${sw(i)}S${i + 1} = { ${c.map(esc).join(', ')} }</span>`).join('') || '<em>none yet</em>'}</div></div>`;
}
export function eulerSide(s) {
  return `<div class="sb"><span class="lbl">Degrees <small>(red ring = odd)</small></span><table class="arr"><tr class="ix"><th></th>${s.V.map((v) => `<td>${esc(v)}</td>`).join('')}</tr><tr><th>deg</th>${s.V.map((v) => `<td><span class="cell ${s.deg[v] % 2 ? 'oddc' : ''}">${s.deg[v]}</span></td>`).join('')}</tr></table></div>
  <div class="sb"><span class="lbl">Stack <small>(top on the right)</small></span><div class="stackv">${cells(s.stack)}</div></div>
  <div class="sb"><span class="lbl">Answer (built from the back)</span><div class="outv">${cells(s.circ)}</div></div>`;
}
export function colourSide(s) {
  return `<div class="sb"><span class="lbl">Order (highest degree first)</span><div class="outv">${s.order.map((v) => `<span class="${s.cur === v ? 'nowc' : ''}">${esc(v)}<small>${s.deg[v]}</small></span>`).join('')}</div></div>
  <div class="sb"><span class="lbl">Colour of each vertex</span><table class="arr"><tr class="ix"><th></th>${s.V.map((v) => `<td>${esc(v)}</td>`).join('')}</tr><tr><th>colour</th>${s.V.map((v) => `<td><span class="cell ${s.col[v] != null ? 'kc k' + (s.col[v] % 6) : ''}">${s.col[v] != null ? 'c' + (s.col[v] + 1) : '–'}</span></td>`).join('')}</tr></table></div>`;
}
