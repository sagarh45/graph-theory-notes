/* ===== Advanced algorithms (Part 7). Same frame format as algos.js ===== */
import { adj, ek, sortIds } from './graph.js';

const b = (x) => '<b>' + x + '</b>';
const INF = '∞';
const show = (x) => (x === Infinity ? INF : x);

/* ---------------- Bellman–Ford ---------------- */
export function bellmanFrames(g, s) {
  const V = g.nodes.map((n) => n.id), F = [];
  const E = [];
  g.edges.forEach((e) => {
    if (e.u === e.v) return;
    const w = e.w == null ? 1 : e.w;
    E.push({ u: e.u, v: e.v, w });
    if (!g.directed) E.push({ u: e.v, v: e.u, w });
  });
  const dist = {}, prev = {};
  V.forEach((v) => { dist[v] = Infinity; prev[v] = null; });
  dist[s] = 0;
  let pass = 0;
  const snap = (msg, extra = {}) => {
    const ec = {};
    V.forEach((v) => { if (prev[v] != null) ec[ek(g, prev[v], v)] = 'tree'; });
    Object.assign(ec, extra.ec || {});
    const nc = {};
    V.forEach((v) => { if (dist[v] < Infinity) nc[v] = 'front'; });
    nc[s] = 'done';
    Object.assign(nc, extra.nc || {});
    const nl = {}; V.forEach((v) => (nl[v] = show(dist[v])));
    F.push({ nc, ec, nl, msg, keyStep: extra.key, side: { V, E, dist: { ...dist }, prev: { ...prev }, pass, cur: extra.cur, hot: extra.hot, s, bad: extra.bad } });
  };
  snap(`${b('Bellman–Ford')} from ${b(s)}. dist[${s}] = 0, all others ∞. We will relax ${b('every edge')}, ${b('n − 1 = ' + (V.length - 1))} times. Negative weights are allowed.`);
  if (!g.directed && g.edges.some((e) => (e.w || 0) < 0)) snap(`Warning: an ${b('undirected')} negative edge u–v is a negative cycle u → v → u by itself. Use a directed graph for negative weights.`);
  let changedLast = true;
  for (pass = 1; pass <= V.length - 1; pass++) {
    let changed = false;
    snap(`${b('Pass ' + pass)} of ${V.length - 1}: go through all ${E.length} edges in the fixed order shown on the right.`, { cur: -1 });
    E.forEach((e, i) => {
      const k = ek(g, e.u, e.v);
      if (dist[e.u] === Infinity) { snap(`Edge ${e.u}→${e.v} (${e.w}): dist[${e.u}] is ∞, so it cannot help yet.`, { ec: { [k]: 'skip' }, cur: i }); return; }
      const nd = dist[e.u] + e.w;
      if (nd < dist[e.v]) {
        const old = dist[e.v]; dist[e.v] = nd; prev[e.v] = e.u; changed = true;
        snap(`Edge ${e.u}→${e.v} (${e.w}): ${dist[e.u]} + (${e.w}) = ${nd} &lt; ${show(old)} → ${b('dist[' + e.v + '] = ' + nd)}, prev = ${e.u}.`, { ec: { [k]: 'cand' }, nc: { [e.v]: 'cur' }, cur: i, hot: e.v });
      } else snap(`Edge ${e.u}→${e.v} (${e.w}): ${dist[e.u]} + (${e.w}) = ${nd} ≥ ${show(dist[e.v])} → no change.`, { ec: { [k]: 'cand' }, cur: i });
    });
    snap(`End of pass ${pass}. ${changed ? 'Some distances improved.' : b('Nothing changed in this pass') + ', so the answer is final — we can stop early.'}`, { key: 'After pass ' + pass, cur: -1 });
    changedLast = changed;
    if (!changed) break;
  }
  pass = Math.min(pass, V.length - 1);
  // negative-cycle check
  let bad = null;
  {
    for (const e of E) {
      if (dist[e.u] !== Infinity && dist[e.u] + e.w < dist[e.v]) { bad = e; break; }
    }
  }
  if (bad) {
    // walk prev n times to land inside the cycle, then collect it
    let x = bad.v; prev[bad.v] = bad.u;
    for (let i = 0; i < V.length; i++) x = prev[x];
    const cyc = [x]; for (let y = prev[x]; y !== x && y != null; y = prev[y]) cyc.unshift(y);
    const nc = {}, ec = {}; cyc.forEach((v) => (nc[v] = 'bad'));
    for (let i = 0; i < cyc.length; i++) ec[ek(g, cyc[i], cyc[(i + 1) % cyc.length])] = 'hot';
    snap(`${b('Extra check (pass n):')} edge ${bad.u}→${bad.v} can ${b('still')} be relaxed. That is only possible if there is a ${b('negative cycle')}: ${cyc.concat(cyc[0]).join(' → ')}. Going round it again and again makes the cost −∞, so ${b('no shortest path exists')}.`, { nc, ec, key: 'Negative cycle!', bad: cyc });
  } else snap(`${b('Extra check:')} one more pass finds no edge that can be relaxed → ${b('no negative cycle')}. Final distances from ${s}: ${V.filter((v) => v !== s).map((v) => v + ' = ' + show(dist[v])).join(', ')}.`, { key: 'Done' });
  return F;
}

/* ---------------- Floyd–Warshall ---------------- */
export function floydFrames(g) {
  const V = sortIds(g.nodes.map((n) => n.id)), F = [];
  const D = {};
  V.forEach((i) => { D[i] = {}; V.forEach((j) => (D[i][j] = i === j ? 0 : Infinity)); });
  g.edges.forEach((e) => {
    const w = e.w == null ? 1 : e.w;
    if (e.u !== e.v) { D[e.u][e.v] = Math.min(D[e.u][e.v], w); if (!g.directed) D[e.v][e.u] = Math.min(D[e.v][e.u], w); }
  });
  let k = null, changed = {};
  const copy = () => { const c = {}; V.forEach((i) => (c[i] = { ...D[i] })); return c; };
  const snap = (msg, extra = {}) => {
    const nc = {};
    if (k != null) nc[k] = 'cur';
    if (extra.i) { nc[extra.i] = 'front'; nc[extra.j] = 'front'; }
    const ec = {};
    if (extra.i) {
      g.edges.forEach((e) => {
        const pairs = [[extra.i, k], [k, extra.j]];
        pairs.forEach(([x, y]) => { if ((e.u === x && e.v === y) || (!g.directed && e.u === y && e.v === x)) ec[ek(g, x, y)] = 'cand'; });
      });
    }
    F.push({ nc, ec, nl: {}, msg, keyStep: extra.key, side: { V, D: copy(), k, i: extra.i, j: extra.j, changed: { ...changed } } });
  };
  snap(`${b('Floyd–Warshall')} finds the shortest path between ${b('every pair')}. Start with D⁰ = the weight matrix: 0 on the diagonal, the edge weight if there is an edge, ∞ otherwise.`, { key: 'D⁰' });
  V.forEach((kk, idx) => {
    k = kk; changed = {};
    snap(`${b('k = ' + k)}: now allow ${b(k)} as a stop in the middle. For every pair (i, j) check: is i → ${k} → j shorter than the best i → j so far? Row ${k} and column ${k} do not change.`);
    let cnt = 0;
    V.forEach((i) => V.forEach((j) => {
      if (i === k || j === k || i === j) return;
      if (D[i][k] === Infinity || D[k][j] === Infinity) return;
      const nd = D[i][k] + D[k][j];
      if (nd < D[i][j]) {
        const old = D[i][j]; D[i][j] = nd; changed[i + '|' + j] = 1; cnt++;
        snap(`D[${i}][${j}]: via ${k} = D[${i}][${k}] + D[${k}][${j}] = ${D[i][k]} + ${D[k][j]} = ${b(nd)} &lt; ${show(old)} → update.`, { i, j });
      }
    }));
    snap(`End of k = ${k}: ${cnt ? b(cnt + ' cell' + (cnt > 1 ? 's' : '') + ' improved') + ' (shaded).' : 'no cell improved.'} This matrix is D<sup>${idx + 1}</sup>.`, { key: 'D' + '¹²³⁴⁵⁶⁷⁸⁹'[idx] + ' (via ' + k + ')' });
  });
  k = null; changed = {};
  const neg = V.filter((v) => D[v][v] < 0);
  snap(neg.length ? `A negative number on the diagonal (${neg.join(', ')}) means a ${b('negative cycle')}.` : `${b('Done.')} Each cell D[i][j] is now the shortest distance from i to j. Total work: n³ = ${V.length ** 3} checks.`, { key: 'Final' });
  return F;
}

/* ---------------- Cycle detection (DFS) ---------------- */
export function cycleFrames(g, s) {
  const A = adj(g), V = g.nodes.map((n) => n.id), F = [];
  const col = {}, par = {}, stack = [], tree = {}, other = {};
  let found = null;
  V.forEach((v) => (col[v] = 0));
  const snap = (cur, msg, extra = {}) => {
    const nc = {};
    V.forEach((v) => { if (col[v] === 2) nc[v] = 'done'; else if (col[v] === 1) nc[v] = 'front'; });
    if (cur != null) nc[cur] = 'cur';
    Object.assign(nc, extra.nc || {});
    const nl = {}; V.forEach((v) => (nl[v] = g.directed ? ['white', 'grey', 'black'][col[v]] : col[v] ? 'seen' : ''));
    F.push({ nc, ec: { ...other, ...tree, ...(extra.ec || {}) }, nl, msg, keyStep: extra.key, side: { V, col: { ...col }, stack: stack.slice(), par: { ...par }, directed: g.directed, cyc: extra.cyc } });
  };
  snap(null, g.directed
    ? `${b('Cycle check in a directed graph')}. Colours: ${b('white')} = not visited, ${b('grey')} = on the current DFS path (stack), ${b('black')} = finished. Reaching a ${b('grey')} vertex again means a cycle.`
    : `${b('Cycle check in an undirected graph')}. Run DFS and remember each vertex's parent. Reaching an already-visited vertex that is ${b('not the parent')} means a cycle.`);
  const finish = (cyc) => {
    const nc = {}, ec = {}; cyc.forEach((v) => (nc[v] = 'bad'));
    for (let i = 0; i < cyc.length; i++) ec[ek(g, cyc[i], cyc[(i + 1) % cyc.length])] = 'hot';
    found = cyc;
    return { nc, ec };
  };
  function dfs(u) {
    col[u] = 1; stack.push(u);
    snap(u, `Visit ${b(u)}${par[u] != null ? ' (parent ' + par[u] + ')' : ''}. ${g.directed ? 'Colour it grey and push it on the path.' : 'Mark it visited.'}`, { key: 'Visit ' + u });
    for (const { v } of A[u]) {
      if (found) return;
      const k = ek(g, u, v);
      if (col[v] === 0) {
        par[v] = u; tree[k] = 'tree';
        dfs(v);
        if (found) return;
        snap(u, `Back at ${b(u)}.`);
      } else if (g.directed && col[v] === 1) {
        const cyc = []; for (let x = u; x !== v; x = par[x]) cyc.unshift(x); cyc.unshift(v);
        const h = finish(cyc);
        snap(u, `Edge ${u}→${v} reaches ${b(v)}, which is ${b('grey')} (still on the path). This is a ${b('back edge')} → ${b('cycle found: ' + cyc.concat(v).join(' → '))}.`, { ...h, key: 'Cycle!', cyc });
        return;
      } else if (g.directed) {
        other[k] = 'skip';
        snap(u, `Edge ${u}→${v}: ${v} is ${b('black')} (already finished). Everything reachable from ${v} was checked, so no cycle through it.`, { ec: { [k]: 'skip' } });
      } else if (v !== par[u]) {
        const cyc = []; for (let x = u; x !== v; x = par[x]) cyc.unshift(x); cyc.unshift(v);
        const h = finish(cyc);
        snap(u, `${b(v)} is already visited and is ${b('not the parent')} of ${u}. Edge ${u}–${v} closes a loop → ${b('cycle found: ' + cyc.concat(v).join(' – '))}.`, { ...h, key: 'Cycle!', cyc });
        return;
      } else {
        snap(u, `${b(v)} is the parent of ${u} — that is just the edge we came along, not a cycle. Skip.`);
      }
    }
    if (found) return;
    col[u] = 2; stack.pop();
    snap(u, g.directed ? `All edges of ${b(u)} checked → colour it ${b('black')} and pop it.` : `All neighbours of ${b(u)} done.`, {});
  }
  const order = [s].concat(sortIds(V).filter((v) => v !== s));
  for (const st of order) { if (found) break; if (!col[st]) { par[st] = null; dfs(st); } }
  if (!found) snap(null, `Every vertex is finished and no ${g.directed ? 'grey vertex' : 'non-parent visited vertex'} was reached → ${b('the graph has no cycle')}${g.directed ? ' (it is a DAG)' : ' (it is a forest)'}.`, { key: 'No cycle' });
  return F;
}

/* ---------------- Bipartite check (BFS 2-colouring) ---------------- */
export function bipartiteFrames(g, s) {
  const A = adj(g), V = g.nodes.map((n) => n.id), F = [];
  const side = {}, q = [];
  let bad = null;
  const snap = (cur, msg, extra = {}) => {
    const nc = {};
    V.forEach((v) => { if (side[v] != null) nc[v] = 'side' + side[v]; });
    if (cur != null) nc[cur] = (nc[cur] || '') + ' ring';
    Object.assign(nc, extra.nc || {});
    const nl = {}; V.forEach((v) => { if (side[v] != null) nl[v] = side[v] ? 'Y' : 'X'; });
    F.push({ nc, ec: extra.ec || {}, nl, msg, keyStep: extra.key, side: { V, side: { ...side }, queue: q.slice() } });
  };
  snap(null, `${b('Bipartite check')}: try to split the vertices into two groups ${b('X')} (white) and ${b('Y')} (dark) so that every edge goes between the groups. BFS gives each neighbour the ${b('opposite')} group.`);
  const order = [s].concat(sortIds(V).filter((v) => v !== s));
  outer: for (const st of order) {
    if (side[st] != null) continue;
    side[st] = 0; q.push(st);
    snap(st, `Put ${b(st)} in group X and enqueue it.`, { key: 'Start ' + st });
    while (q.length) {
      const u = q.shift();
      for (const { v } of A[u]) {
        const k = ek(g, u, v);
        if (side[v] == null) {
          side[v] = 1 - side[u]; q.push(v);
          snap(u, `${b(v)} is a neighbour of ${u} (${side[u] ? 'Y' : 'X'}) → put ${v} in the ${b('other')} group ${side[v] ? 'Y' : 'X'}.`, { ec: { [k]: 'tree' } });
        } else if (side[v] === side[u]) {
          bad = [u, v];
          snap(u, `Edge ${u}–${v} joins two vertices of the ${b('same group')} (${side[u] ? 'Y' : 'X'}). They are at the same BFS level, so there is an ${b('odd cycle')} → ${b('NOT bipartite')}.`, { nc: { [u]: 'bad', [v]: 'bad' }, ec: { [k]: 'hot' }, key: 'Conflict ' + u + v });
          break outer;
        }
      }
    }
  }
  if (!bad) {
    const X = V.filter((v) => side[v] === 0), Y = V.filter((v) => side[v] === 1);
    snap(null, `No edge joins two vertices of the same group → ${b('bipartite')}. X = {${X.join(', ')}}, Y = {${Y.join(', ')}}.`, { key: 'Bipartite' });
  }
  return F;
}

/* ---------------- Connected components ---------------- */
export function componentsFrames(g) {
  const A = adj(g), V = sortIds(g.nodes.map((n) => n.id)), F = [];
  const comp = {}, comps = [];
  const snap = (cur, msg, extra = {}) => {
    const nc = {};
    V.forEach((v) => { if (comp[v] != null) nc[v] = 'k' + (comp[v] % 6); });
    if (cur != null) nc[cur] = (nc[cur] || '') + ' ring';
    const nl = {}; V.forEach((v) => { if (comp[v] != null) nl[v] = 'C' + (comp[v] + 1); });
    F.push({ nc, ec: extra.ec || {}, nl, msg, keyStep: extra.key, side: { V, comps: comps.map((c) => c.slice()) } });
  };
  snap(null, `${b('Connected components')}: scan vertices in order. Each time we meet an ${b('unvisited')} vertex, start a new DFS — everything it reaches is one component.`);
  const tree = {};
  for (const st of V) {
    if (comp[st] != null) continue;
    const c = comps.length; comps.push([]);
    const stk = [st];
    comp[st] = c; comps[c].push(st);
    snap(st, `${b(st)} is not visited → start ${b('component ' + (c + 1))} here.`, { ec: tree });
    while (stk.length) {
      const u = stk.pop();
      for (const { v } of A[u]) {
        if (comp[v] == null) {
          comp[v] = c; comps[c].push(v); stk.push(v); tree[ek(g, u, v)] = 'tree';
          snap(v, `Reach ${b(v)} from ${u} → it belongs to component ${c + 1}.`, { ec: tree });
        }
      }
    }
    snap(null, `Nothing new is reachable. Component ${c + 1} = {${sortIds(comps[c]).join(', ')}}.`, { ec: tree, key: 'C' + (c + 1) + ' = {' + sortIds(comps[c]).join(',') + '}' });
  }
  snap(null, `${b(comps.length + ' component' + (comps.length > 1 ? 's' : ''))}. ${comps.length === 1 ? 'The graph is connected.' : 'The graph is not connected.'} Each colour is one component.`, { ec: tree, key: 'Done' });
  return F;
}

/* ---------------- Bridges and articulation points (Tarjan) ---------------- */
export function bridgeFrames(g, s) {
  const A = adj(g), V = g.nodes.map((n) => n.id), F = [];
  const disc = {}, low = {}, par = {}, tree = {}, back = {}, bridges = [], cut = new Set(), stack = [];
  let t = 0;
  const snap = (cur, msg, extra = {}) => {
    const nc = {};
    V.forEach((v) => { if (disc[v] != null) nc[v] = stack.includes(v) ? 'front' : 'done'; });
    if (cur != null) nc[cur] = 'cur';
    cut.forEach((v) => (nc[v] = (nc[v] || '') + ' cutv'));
    Object.assign(nc, extra.nc || {});
    const ec = { ...back, ...tree };
    bridges.forEach(([x, y]) => (ec[ek(g, x, y)] = 'hot'));
    Object.assign(ec, extra.ec || {});
    const nl = {}; V.forEach((v) => { if (disc[v] != null) nl[v] = disc[v] + '/' + low[v]; });
    F.push({ nc, ec, nl, msg, keyStep: extra.key, side: { V, disc: { ...disc }, low: { ...low }, par: { ...par }, bridges: bridges.slice(), cut: [...cut], hot: extra.hot } });
  };
  snap(null, `${b('Bridges and cut vertices')} (Tarjan's DFS). Label = ${b('disc / low')}. disc = when DFS first reached the vertex. low = the smallest disc reachable from its subtree using ${b('one back edge')}.`);
  function dfs(u) {
    disc[u] = low[u] = ++t; stack.push(u);
    let kids = 0;
    snap(u, `Visit ${b(u)}: disc = low = ${t}.`, { key: 'Visit ' + u, hot: u });
    for (const { v } of A[u]) {
      const k = ek(g, u, v);
      if (disc[v] == null) {
        par[v] = u; tree[k] = 'tree'; kids++;
        dfs(v);
        const old = low[u];
        low[u] = Math.min(low[u], low[v]);
        let note = `Back at ${b(u)} from ${v}: low[${u}] = min(${old}, low[${v}] = ${low[v]}) = ${low[u]}.`;
        if (low[v] > disc[u]) { bridges.push([u, v]); note += ` low[${v}] = ${low[v]} &gt; disc[${u}] = ${disc[u]} → nothing below ${v} climbs back to ${u} or higher, so ${b(u + '–' + v + ' is a bridge')}.`; }
        if (par[u] != null && low[v] >= disc[u]) { cut.add(u); note += ` low[${v}] ≥ disc[${u}] → removing ${u} cuts off ${v}'s subtree: ${b(u + ' is a cut vertex')}.`; }
        snap(u, note, { ec: { [k]: low[v] > disc[u] ? 'hot' : 'tree' }, key: low[v] > disc[u] || (par[u] != null && low[v] >= disc[u]) ? 'Check ' + u + v : undefined, hot: u });
      } else if (v !== par[u]) {
        if (disc[v] < disc[u]) {
          back[k] = 'back';
          const old = low[u]; low[u] = Math.min(low[u], disc[v]);
          snap(u, `Edge ${u}–${v} is a ${b('back edge')} (${v} is an ancestor). low[${u}] = min(${old}, disc[${v}] = ${disc[v]}) = ${low[u]}.`, { ec: { [k]: 'back' }, hot: u });
        }
      }
    }
    if (par[u] == null && kids >= 2) { cut.add(u); snap(u, `${b(u)} is the DFS root with ${b(kids + ' children')} → removing it separates them: ${b(u + ' is a cut vertex')}.`, { hot: u }); }
    else if (par[u] == null) snap(u, `${b(u)} is the root with only ${kids} child, so it is ${b('not')} a cut vertex.`, { hot: u });
    stack.pop();
  }
  const order = [s].concat(sortIds(V).filter((v) => v !== s));
  for (const st of order) if (disc[st] == null) { par[st] = null; dfs(st); }
  snap(null, `Done. ${b('Bridges:')} ${bridges.length ? bridges.map((x) => x.join('–')).join(', ') : 'none'}. ${b('Cut vertices:')} ${cut.size ? sortIds([...cut]).join(', ') : 'none'}. One DFS, O(V + E).`, { key: 'Result' });
  return F;
}

/* ---------------- Strongly connected components (Kosaraju) ---------------- */
export function sccFrames(g) {
  const V = sortIds(g.nodes.map((n) => n.id)), F = [];
  if (!g.directed) {
    F.push({ nc: {}, ec: {}, nl: {}, msg: `SCCs are defined for ${b('directed')} graphs. In an undirected graph they are simply the connected components.`, side: { V, fin: [], comps: [], phase: 0 } });
    return F;
  }
  const A = adj(g);
  const gT = { ...g, edges: g.edges.map((e) => ({ ...e, u: e.v, v: e.u })) };
  const AT = adj(gT);
  const vis = {}, fin = [], comp = {}, comps = [], tree = {};
  let phase = 1, G = g;
  const snap = (cur, msg, extra = {}) => {
    const nc = {};
    V.forEach((v) => {
      if (comp[v] != null) nc[v] = 'k' + (comp[v] % 6);
      else if (phase === 1 && vis[v]) nc[v] = fin.includes(v) ? 'done' : 'front';
    });
    if (cur != null) nc[cur] = (nc[cur] || '') + ' ring';
    const nl = {};
    if (phase === 1) fin.forEach((v, i) => (nl[v] = 'f' + (i + 1)));
    else V.forEach((v) => { if (comp[v] != null) nl[v] = 'S' + (comp[v] + 1); });
    F.push({ g: G, nc, ec: { ...tree, ...(extra.ec || {}) }, nl, msg, keyStep: extra.key, side: { V, fin: fin.slice(), comps: comps.map((c) => c.slice()), phase } });
  };
  snap(null, `${b('Kosaraju\'s algorithm')} for strongly connected components (SCCs). ${b('Pass 1:')} DFS on G and write each vertex down when it ${b('finishes')}.`);
  function dfs1(u) {
    vis[u] = 1;
    snap(u, `Pass 1: visit ${b(u)}.`);
    for (const { v } of A[u]) if (!vis[v]) { tree[ek(g, u, v)] = 'tree'; dfs1(v); }
    fin.push(u);
    snap(u, `${b(u)} finishes → push on the finish stack (position ${fin.length}).`);
  }
  for (const v of V) if (!vis[v]) dfs1(v);
  snap(null, `Pass 1 done. Finish order: ${fin.join(', ')}. The ${b('last')} to finish (${fin[fin.length - 1]}) is in a "source" SCC.`, { key: 'Finish order' });
  phase = 2; G = gT; Object.keys(tree).forEach((k) => delete tree[k]);
  snap(null, `${b('Reverse every edge')} (the transpose Gᵀ). SCCs stay the same, but now we cannot leak from one SCC into another if we start from the latest finisher.`, { key: 'Transpose Gᵀ' });
  const seen = {};
  for (let i = fin.length - 1; i >= 0; i--) {
    const st = fin[i];
    if (seen[st]) continue;
    const c = comps.length; comps.push([]);
    const stk = [st]; seen[st] = 1; comp[st] = c; comps[c].push(st);
    snap(st, `Pass 2: take the latest unfinished-in-pass-2 vertex from the stack, ${b(st)}. DFS on Gᵀ from it.`);
    while (stk.length) {
      const u = stk.pop();
      for (const { v } of AT[u]) if (!seen[v]) { seen[v] = 1; comp[v] = c; comps[c].push(v); stk.push(v); tree[ek(gT, u, v)] = 'tree'; snap(v, `Reach ${b(v)} in Gᵀ → same SCC as ${st}.`); }
    }
    snap(null, `${b('SCC ' + (c + 1) + ' = {' + sortIds(comps[c]).join(', ') + '}')}. Inside it every vertex can reach every other.`, { key: 'S' + (c + 1) + ' = {' + sortIds(comps[c]).join(',') + '}' });
  }
  G = g; Object.keys(tree).forEach((k) => delete tree[k]);
  g.edges.forEach((e) => { if (comp[e.u] === comp[e.v]) tree[ek(g, e.u, e.v)] = 'tree'; });
  snap(null, `Done: ${b(comps.length + ' SCC' + (comps.length > 1 ? 's' : ''))}. Back on the original graph, thick edges stay inside an SCC; thin ones join different SCCs (they always form a DAG). Two DFS passes → O(V + E).`, { key: 'Done' });
  return F;
}

/* ---------------- Euler path / circuit (Hierholzer) ---------------- */
export function eulerFrames(g, s0) {
  const V = g.nodes.map((n) => n.id), F = [];
  const deg = {}; V.forEach((v) => (deg[v] = 0));
  g.edges.forEach((e) => { deg[e.u]++; deg[e.v]++; });
  const odd = sortIds(V.filter((v) => deg[v] % 2));
  const used = {}, onC = {}, stack = [], estack = [], circ = [];
  const snap = (cur, msg, extra = {}) => {
    const nc = {};
    odd.forEach((v) => (nc[v] = 'oddv'));
    stack.forEach((v) => (nc[v] = (nc[v] || '') + ' front'));
    if (cur != null) nc[cur] = (nc[cur] || '') + ' cur';
    Object.assign(nc, extra.nc || {});
    const ec = {};
    g.edges.forEach((e, i) => { if (onC[i]) ec['#' + i] = 'tree'; else if (used[i]) ec['#' + i] = 'cand'; });
    // svgGraph looks up ec[key] first, so clear plain keys
    const nl = {}; V.forEach((v) => (nl[v] = 'deg ' + deg[v]));
    F.push({ nc, ec, nl, msg, keyStep: extra.key, side: { V, deg, odd, stack: stack.slice(), circ: circ.slice() } });
  };
  snap(null, `${b('Euler path')} = a walk that uses ${b('every edge exactly once')}. Count degrees first. Odd-degree vertices: ${odd.length ? b(odd.join(', ')) : b('none')}.`);
  const connected = (() => {
    const withE = V.filter((v) => deg[v] > 0); if (!withE.length) return true;
    const A = adj(g), seen = { [withE[0]]: 1 }, st = [withE[0]];
    while (st.length) { const u = st.pop(); A[u].forEach(({ v }) => { if (!seen[v]) { seen[v] = 1; st.push(v); } }); }
    return withE.every((v) => seen[v]);
  })();
  if (!connected) { snap(null, `The edges are in ${b('more than one piece')}, so no single walk can use them all.`, { key: 'Not possible' }); return F; }
  if (odd.length !== 0 && odd.length !== 2) {
    const nc = {}; odd.forEach((v) => (nc[v] = 'bad'));
    snap(null, `${b(odd.length + ' vertices have odd degree')}. An Euler path needs ${b('0')} (circuit) or ${b('2')} (path) odd vertices. Each time you pass through a vertex you use 2 edges, so only the start and end can be odd → ${b('no Euler path')}.`, { nc, key: 'No Euler path' });
    return F;
  }
  const s = odd.length ? odd[0] : (V.includes(s0) && deg[s0] ? s0 : V.find((v) => deg[v]));
  snap(s, odd.length ? `Exactly ${b('2 odd vertices')} (${odd.join(', ')}) → an ${b('Euler path')} exists. It must start at one odd vertex and end at the other. Start at ${b(s)}.` : `All degrees are even → an ${b('Euler circuit')} exists (it ends where it starts). Start at ${b(s)}.`, { key: odd.length ? 'Path ' + odd.join('…') : 'Circuit' });
  snap(s, `${b('Hierholzer\'s method')}: keep walking along unused edges, pushing vertices on a stack. When stuck, pop the vertex into the answer. Amber = walked, blue = fixed in the answer.`);
  stack.push(s); estack.push(-1);
  const inc = {}; V.forEach((v) => (inc[v] = []));
  g.edges.forEach((e, i) => { inc[e.u].push([e.v, i]); if (e.u !== e.v) inc[e.v].push([e.u, i]); });
  V.forEach((v) => inc[v].sort((a, c) => (String(a[0]) < String(c[0]) ? -1 : String(a[0]) > String(c[0]) ? 1 : a[1] - c[1])));
  let guard = 0;
  while (stack.length && guard++ < 500) {
    const u = stack[stack.length - 1];
    const nxt = inc[u].find(([, i]) => !used[i]);
    if (nxt) {
      const [v, i] = nxt; used[i] = 1; stack.push(v); estack.push(i);
      snap(v, `From ${b(u)} take the unused edge ${u}–${v} (smallest letter first). Push ${v}.`);
    } else {
      stack.pop(); const i = estack.pop(); if (i >= 0) onC[i] = 1; circ.unshift(u);
      snap(u, `${b(u)} has no unused edge left → pop it and put it at the ${b('front')} of the answer: ${circ.join(' ')}.`, { key: circ.length > 1 ? 'Pop ' + u : undefined });
    }
  }
  snap(null, `All ${g.edges.length} edges used once. ${b((odd.length ? 'Euler path: ' : 'Euler circuit: ') + circ.join(' → '))}.`, { key: 'Done' });
  return F;
}

/* ---------------- Graph colouring (Welsh–Powell greedy) ---------------- */
export function colourFrames(g) {
  const A = adj(g), V = g.nodes.map((n) => n.id), F = [];
  const deg = {}; V.forEach((v) => (deg[v] = new Set(A[v].map((x) => x.v).filter((x) => x !== v)).size));
  const order = sortIds(V).sort((x, y) => deg[y] - deg[x]);
  const col = {};
  const snap = (cur, msg, extra = {}) => {
    const nc = {};
    V.forEach((v) => { if (col[v] != null) nc[v] = 'k' + (col[v] % 6); });
    if (cur != null) nc[cur] = (nc[cur] || '') + ' ring';
    const nl = {}; V.forEach((v) => { if (col[v] != null) nl[v] = 'c' + (col[v] + 1); });
    F.push({ nc, ec: extra.ec || {}, nl, msg, keyStep: extra.key, side: { V, order, deg, col: { ...col }, cur } });
  };
  snap(null, `${b('Graph colouring')}: give each vertex a colour so that ${b('no edge joins two vertices of the same colour')}, using as few colours as possible. ${b('Welsh–Powell')}: sort vertices by degree (largest first): ${order.map((v) => v + '(' + deg[v] + ')').join(', ')}.`);
  for (const v of order) {
    const nb = [...new Set(A[v].map((x) => x.v))].filter((x) => x !== v);
    const taken = new Set(nb.filter((x) => col[x] != null).map((x) => col[x]));
    let c = 0; while (taken.has(c)) c++;
    const ec = {}; nb.forEach((x) => { if (col[x] != null) ec[ek(g, v, x)] = 'cand'; });
    col[v] = c;
    snap(v, `${b(v)}: neighbours already coloured use ${taken.size ? [...taken].sort().map((x) => 'c' + (x + 1)).join(', ') : 'nothing'} → give ${v} the smallest free colour ${b('c' + (c + 1))}.`, { ec, key: v + ' = c' + (c + 1) });
  }
  const k = Math.max(...Object.values(col)) + 1;
  snap(null, `Done with ${b(k + ' colour' + (k > 1 ? 's' : ''))}. So the chromatic number χ(G) ≤ ${k}. Greedy is fast but not always optimal — finding the true minimum is NP-hard.`, { key: k + ' colours' });
  return F;
}
