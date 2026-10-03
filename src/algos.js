/* ===== Algorithms: every run returns a list of frames =====
   frame = { nc:{id:cls}, ec:{edgeKey:cls}, nl:{id:label}, msg:html, side:{...} }  */
import { adj, ek, sortIds } from './graph.js';

const b = (x) => '<b>' + x + '</b>';
const INF = '∞';

/* ---------------- BFS ---------------- */
export function bfsFrames(g, s, opt = {}) {
  const A = adj(g), V = g.nodes.map((n) => n.id), F = [];
  const vis = {}, lvl = {}, par = {}, out = [], tree = {};
  let q = [], qlog = [], front = 0;
  const snap = (cur, msg, extra = {}) => {
    const nc = {};
    V.forEach((v) => { if (out.includes(v)) nc[v] = 'done'; else if (vis[v]) nc[v] = 'front'; });
    if (cur != null) nc[cur] = 'cur';
    Object.assign(nc, extra.nc || {});
    const ec = { ...tree, ...(extra.ec || {}) };
    const nl = {}; V.forEach((v) => { if (lvl[v] != null) nl[v] = 'L' + lvl[v]; });
    F.push({ nc, ec, nl, msg, keyStep: extra.key, side: { queue: q.slice(), qlog: qlog.slice(), front, out: out.slice(), vis: { ...vis }, V, par: { ...par }, lvl: { ...lvl } } });
  };
  const starts = [s].concat(opt.all === false ? [] : sortIds(V).filter((v) => v !== s));
  snap(null, `${b('Breadth First Search')} from ${b(s)}. BFS uses a ${b('queue')} (first in, first out) and a ${b('visited[]')} array, all 0 at the start.`);
  let first = true;
  for (const st of starts) {
    if (vis[st]) continue;
    if (!first) snap(null, `The queue is empty but ${b(V.filter((v) => !vis[v]).join(', '))} ${V.filter((v) => !vis[v]).length > 1 ? 'are' : 'is'} not visited, so the graph is ${b('not connected')}. Start a new BFS from ${b(st)}.`);
    first = false;
    vis[st] = 1; lvl[st] = 0; q.push(st); qlog.push(st);
    snap(st, `Mark ${b(st)} visited and ${b('enqueue')} it. Its level (distance in edges) is 0.`, { nc: { [st]: 'front' } });
    while (q.length) {
      const u = q.shift(); front++; out.push(u);
      snap(u, `${b('Dequeue ' + u)} and print it. Now look at every neighbour of ${u} in alphabetical order: ${A[u].length ? A[u].map((x) => x.v).join(', ') : 'none'}.`, { key: 'Visit ' + u });
      for (const { v } of A[u]) {
        const k = ek(g, u, v);
        if (!vis[v]) {
          vis[v] = 1; lvl[v] = lvl[u] + 1; par[v] = u; q.push(v); qlog.push(v); tree[k] = 'tree';
          snap(u, `${b(v)} is not visited → mark it, set level ${lvl[v]}, ${b('enqueue ' + v)}. Edge ${u}–${v} joins the BFS tree.`, { nc: { [v]: 'front new' } });
        } else if (!opt.quiet) {
          snap(u, `${b(v)} is already visited → skip it.`, { ec: { [k]: tree[k] || 'skip' } });
        }
      }
    }
  }
  snap(null, `Queue empty — done. ${b('BFS order: ' + out.join(' '))}. Thick edges form the ${b('BFS spanning tree')}; the L-labels give the fewest edges from ${s}.`, { key: 'Done' });
  return F;
}

/* ---------------- DFS (recursive, with times) ---------------- */
export function dfsFrames(g, s, opt = {}) {
  const A = adj(g), V = g.nodes.map((n) => n.id), F = [];
  const col = {}, d = {}, fin = {}, par = {}, out = [], tree = {}, other = {}, stack = [];
  let t = 0;
  const snap = (cur, msg, extra = {}) => {
    const nc = {};
    V.forEach((v) => { if (col[v] === 2) nc[v] = 'done'; else if (col[v] === 1) nc[v] = 'front'; });
    if (cur != null) nc[cur] = 'cur';
    Object.assign(nc, extra.nc || {});
    const nl = {}; V.forEach((v) => { if (d[v] != null) nl[v] = d[v] + '/' + (fin[v] != null ? fin[v] : '–'); });
    F.push({ nc, ec: { ...other, ...tree, ...(extra.ec || {}) }, nl, msg, keyStep: extra.key, side: { stack: stack.slice(), out: out.slice(), vis: Object.fromEntries(V.map((v) => [v, col[v] ? 1 : 0])), V, d: { ...d }, fin: { ...fin } } });
  };
  snap(null, `${b('Depth First Search')} from ${b(s)}. DFS goes as ${b('deep')} as possible before coming back. Recursion uses the ${b('call stack')} (last in, first out). Labels show ${b('discovery / finish')} time.`);
  const visit = (u, from) => {
    col[u] = 1; d[u] = ++t; par[u] = from; out.push(u); stack.push(u);
    snap(u, `Call ${b('dfs(' + u + ')')}: mark ${u} visited, print it, discovery time ${d[u]}. Push it on the stack.`, { key: 'Visit ' + u });
    for (const { v } of A[u]) {
      const k = ek(g, u, v);
      if (!col[v]) {
        tree[k] = 'tree';
        snap(u, `Neighbour ${b(v)} is not visited → go deeper along ${u}–${v} (tree edge).`, { nc: { [v]: 'new' } });
        visit(v, u);
        snap(u, `Back in ${b('dfs(' + u + ')')}. Continue with the next neighbour of ${u}.`);
      } else if (!g.directed && v === from) {
        if (!opt.quiet) snap(u, `${b(v)} is the parent of ${u} (we came from there) → skip.`, {});
      } else if (!tree[k]) {
        let type;
        if (col[v] === 1) type = 'back';
        else if (g.directed) type = d[v] > d[u] ? 'fwd' : 'cross';
        else type = 'skip';
        if (type !== 'skip') other[k] = type;
        const name = { back: 'back edge (it closes a cycle)', fwd: 'forward edge', cross: 'cross edge', skip: 'already visited' }[type];
        if (!opt.quiet || type !== 'skip') snap(u, `${b(v)} is already visited → ${name}. Skip it.`, { ec: type === 'skip' ? { [k]: 'skip' } : {} });
      }
    }
    col[u] = 2; fin[u] = ++t; stack.pop();
    snap(u, `All neighbours of ${b(u)} are done → finish time ${fin[u]}. ${b('Pop ' + u)} and return.`, { nc: { [u]: 'done' } });
  };
  const starts = [s].concat(opt.all === false ? [] : sortIds(V).filter((v) => v !== s));
  let first = true;
  for (const st of starts) {
    if (col[st]) continue;
    if (!first) snap(null, `Stack empty, but ${b(V.filter((v) => !col[v]).join(', '))} not visited yet — the graph is not connected (or not reachable). Start DFS again from ${b(st)}.`);
    first = false;
    visit(st, null);
  }
  const hasBack = Object.values(other).includes('back');
  snap(null, `Done. ${b('DFS order: ' + out.join(' '))}. ${hasBack ? 'A ' + b('back edge') + ' was found, so the graph has a ' + b('cycle') + '.' : 'No back edge, so the graph has ' + b('no cycle') + '.'}`, { key: 'Done' });
  return F;
}


/* ---------------- DFS with an explicit stack (same order as the recursive version) ---------------- */
export function dfsStackFrames(g, s, opt = {}) {
  const A = adj(g), V = g.nodes.map((n) => n.id), F = [];
  const vis = {}, out = [], tree = {};
  let stack = []; // {v, p}
  const fromPush = {};
  const snap = (cur, msg, extra = {}) => {
    const nc = {};
    V.forEach((v) => { if (vis[v]) nc[v] = 'done'; else if (stack.some((x) => x.v === v)) nc[v] = 'front'; });
    if (cur != null) nc[cur] = 'cur';
    Object.assign(nc, extra.nc || {});
    F.push({
      nc, ec: { ...tree, ...(extra.ec || {}) }, nl: {}, msg, keyStep: extra.key,
      side: { stack: stack.map((x) => x.v), out: out.slice(), vis: { ...vis }, V, d: {}, fin: {} },
    });
  };
  snap(null, `${b('DFS with a stack')} from ${b(s)}. A stack is ${b('last in, first out')}: the vertex pushed last sits on top and comes out first. Push neighbours in ${b('reverse alphabetical order')} so the smallest letter is on top.`);
  const starts = [s].concat(opt.all === false ? [] : sortIds(V).filter((v) => v !== s));
  let first = true;
  for (const st of starts) {
    if (vis[st]) continue;
    if (!first) snap(null, `Stack empty, but ${b(V.filter((v) => !vis[v]).join(', '))} not visited. Start again: ${b('PUSH ' + st)}.`);
    first = false;
    stack.push({ v: st, p: null });
    snap(st, `${b('PUSH ' + st)}. Stack, bottom → top: ${stack.map((x) => x.v).join(' ')}.`, { nc: { [st]: 'front' } });
    while (stack.length) {
      const item = stack.pop();
      const u = item.v;
      if (vis[u]) {
        snap(u, `${b('POP ' + u)}. Already visited → skip this copy. It was pushed more than once.`, { ec: item.p != null ? { [ek(g, item.p, u)]: tree[ek(g, item.p, u)] || 'skip' } : {} });
        continue;
      }
      vis[u] = 1; out.push(u);
      if (item.p != null) tree[ek(g, item.p, u)] = 'tree';
      const nbrs = A[u].map((x) => x.v).filter((v) => !vis[v]);
      const rev = nbrs.slice().reverse();
      rev.forEach((v) => { fromPush[v] = u; stack.push({ v, p: u }); });
      snap(u, `${b('POP ' + u)} — not visited, so ${b('print ' + u)}. Unvisited neighbours: ${nbrs.length ? nbrs.join(', ') : 'none'}. ${b('PUSH')} them in reverse order${rev.length ? ' (' + rev.join(', then ') + ')' : ''} so ${nbrs[0] || '—'} is on top.`, { key: 'Visit ' + u });
    }
  }
  snap(null, `Stack empty. ${b('DFS order: ' + out.join(' '))}. Thick edges are the DFS tree. This order matches the recursive DFS when neighbours are taken alphabetically and the stack is pushed in reverse.`, { key: 'Done' });
  return F;
}

/* ---------------- Prim ---------------- */
export function primFrames(g, s) {
  const A = adj(g), V = g.nodes.map((n) => n.id), F = [];
  const key = {}, par = {}, inT = {}, tree = {};
  let total = 0;
  V.forEach((v) => { key[v] = Infinity; par[v] = null; });
  key[s] = 0;
  const snap = (cur, msg, extra = {}) => {
    const nc = {};
    V.forEach((v) => { if (inT[v]) nc[v] = 'done'; else if (key[v] < Infinity) nc[v] = 'front'; });
    if (cur != null) nc[cur] = 'cur';
    const nl = {}; V.forEach((v) => { if (!inT[v]) nl[v] = key[v] === Infinity ? INF : key[v]; });
    F.push({ nc, ec: { ...tree, ...(extra.ec || {}) }, nl, msg, keyStep: extra.key, side: { V, key: { ...key }, par: { ...par }, inT: { ...inT }, total, hot: extra.hot } });
  };
  snap(null, `${b("Prim's algorithm")} grows ${b('one tree')} from ${b(s)}. key[v] = cheapest edge joining v to the tree so far. Start: key[${s}] = 0, all others ∞.`);
  for (let it = 0; it < V.length; it++) {
    let u = null;
    sortIds(V).forEach((v) => { if (!inT[v] && key[v] < Infinity && (u === null || key[v] < key[u])) u = v; });
    if (u === null) { snap(null, `No vertex left with a finite key — the graph is ${b('not connected')}, so it has no spanning tree.`); break; }
    inT[u] = 1;
    if (par[u] != null) { tree[ek(g, par[u], u)] = 'tree'; total += key[u]; }
    snap(u, par[u] == null ? `Pick ${b(u)} (key 0) as the first vertex of the tree.` : `Pick the smallest key: ${b(u)} (${key[u]}). Add edge ${b(par[u] + '–' + u)} to the MST. Total = ${total}.`, { key: par[u] == null ? 'Start ' + u : '+' + par[u] + u + ' (' + key[u] + ')' });
    for (const { v, w } of A[u]) {
      if (inT[v]) continue;
      const k = ek(g, u, v);
      if (w < key[v]) {
        const old = key[v]; key[v] = w; par[v] = u;
        snap(u, `Edge ${u}–${v} weighs ${w} < key[${v}] = ${old === Infinity ? INF : old} → update key[${v}] = ${w}, parent ${u}.`, { ec: { [k]: 'cand' }, hot: v });
      } else {
        snap(u, `Edge ${u}–${v} weighs ${w} ≥ key[${v}] = ${key[v]} → no change.`, { ec: { [k]: 'skip' }, hot: v });
      }
    }
  }
  if (Object.keys(inT).length === V.length) snap(null, `All ${V.length} vertices are in the tree. The MST has ${b(V.length - 1 + ' edges')} and total weight ${b(total)}.`, { key: 'MST = ' + total });
  return F;
}

/* ---------------- Kruskal ---------------- */
export function kruskalFrames(g) {
  const V = g.nodes.map((n) => n.id), F = [];
  const E = g.edges.map((e, i) => ({ ...e, w: e.w == null ? 1 : e.w, i })).filter((e) => e.u !== e.v)
    .sort((a, c) => a.w - c.w || (a.u + a.v).localeCompare(c.u + c.v));
  const parent = {}; V.forEach((v) => (parent[v] = v));
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const status = {}, tree = {}, rej = {};
  let total = 0, taken = 0;
  const sets = () => { const m = {}; V.forEach((v) => { const r = find(v); (m[r] = m[r] || []).push(v); }); return Object.values(m).map(sortIds).sort((a, c) => a[0].localeCompare(c[0])); };
  const snap = (msg, extra = {}) => {
    const nc = {};
    V.forEach((v) => { if (Object.values(tree).length && E.some((e) => status[e.i] === 'tree' && (e.u === v || e.v === v))) nc[v] = 'done'; });
    Object.assign(nc, extra.nc || {});
    F.push({ nc, ec: { ...rej, ...tree, ...(extra.ec || {}) }, nl: {}, msg, keyStep: extra.key, side: { E, status: { ...status }, sets: sets(), total, cur: extra.cur } });
  };
  snap(`${b("Kruskal's algorithm")}: sort all edges by weight, then take them one by one, ${b('smallest first')}. Skip an edge if it would make a cycle. Every vertex starts in its own set.`);
  for (const e of E) {
    if (taken === V.length - 1) break;
    const k = ek(g, e.u, e.v);
    snap(`Next smallest edge: ${b(e.u + '–' + e.v + ' (' + e.w + ')')}. Are ${e.u} and ${e.v} in different sets?`, { ec: { [k]: 'cand' }, nc: { [e.u]: 'cur', [e.v]: 'cur' }, cur: e.i });
    const ru = find(e.u), rv = find(e.v);
    if (ru !== rv) {
      parent[ru] = rv; status[e.i] = 'tree'; tree[k] = 'tree'; total += e.w; taken++;
      snap(`Yes → ${b('take it')}. Union the two sets. MST edges: ${taken}, total ${total}.`, { cur: e.i, key: '+' + e.u + e.v + ' (' + e.w + ')' });
    } else {
      status[e.i] = 'rej'; rej[k] = 'rej';
      snap(`No — ${e.u} and ${e.v} are already connected. Taking it would form a ${b('cycle')} → ${b('reject')}.`, { cur: e.i, nc: { [e.u]: 'bad', [e.v]: 'bad' } });
    }
  }
  snap(taken === V.length - 1 ? `Done: ${b(taken + ' edges')} (n − 1), total weight ${b(total)}.` : `Edges finished with only ${taken} taken — the graph is not connected, so we get a ${b('spanning forest')}.`, { key: 'MST = ' + total });
  return F;
}

/* ---------------- Dijkstra ---------------- */
export function dijkstraFrames(g, s) {
  const A = adj(g), V = g.nodes.map((n) => n.id), F = [];
  const dist = {}, prev = {}, done = {}, tree = {};
  V.forEach((v) => { dist[v] = Infinity; prev[v] = null; });
  dist[s] = 0;
  const neg = g.edges.some((e) => e.w < 0);
  const snap = (cur, msg, extra = {}) => {
    const nc = {};
    V.forEach((v) => { if (done[v]) nc[v] = 'done'; else if (dist[v] < Infinity) nc[v] = 'front'; });
    if (cur != null) nc[cur] = 'cur';
    Object.assign(nc, extra.nc || {});
    const nl = {}; V.forEach((v) => (nl[v] = dist[v] === Infinity ? INF : dist[v]));
    const ec = {}; V.forEach((v) => { if (prev[v] != null) ec[ek(g, prev[v], v)] = 'tree'; });
    F.push({ nc, ec: { ...ec, ...(extra.ec || {}) }, nl, msg, keyStep: extra.key, side: { V, dist: { ...dist }, prev: { ...prev }, done: { ...done }, hot: extra.hot, s } });
  };
  snap(null, `${b("Dijkstra's algorithm")} finds the shortest distance from ${b(s)} to every vertex. Start: dist[${s}] = 0, every other dist = ∞.${neg ? ' <span class="warn-t">Warning: this graph has a negative edge — Dijkstra may give a wrong answer.</span>' : ''}`);
  for (let it = 0; it < V.length; it++) {
    let u = null;
    sortIds(V).forEach((v) => { if (!done[v] && dist[v] < Infinity && (u === null || dist[v] < dist[u])) u = v; });
    if (u === null) { snap(null, `The remaining vertices have dist ∞ — they cannot be reached from ${s}.`); break; }
    done[u] = 1;
    snap(u, `Pick the unfinished vertex with the smallest dist: ${b(u + ' (' + dist[u] + ')')}. Its distance is now ${b('final')}.`, { key: 'Fix ' + u + ' = ' + dist[u] });
    for (const { v, w } of A[u]) {
      if (done[v]) continue;
      const k = ek(g, u, v), nd = dist[u] + w;
      if (nd < dist[v]) {
        const old = dist[v]; dist[v] = nd; prev[v] = u;
        snap(u, `${b('Relax')} ${u}→${v}: ${dist[u]} + ${w} = ${nd} < ${old === Infinity ? INF : old} → dist[${v}] = ${nd}, prev[${v}] = ${u}.`, { ec: { [k]: 'cand' }, hot: v });
      } else {
        snap(u, `Relax ${u}→${v}: ${dist[u]} + ${w} = ${nd} ≥ ${dist[v]} → keep ${dist[v]}.`, { ec: { [k]: 'skip' }, hot: v });
      }
    }
  }
  snap(null, `All done. Thick edges form the ${b('shortest-path tree')} from ${s}. Read a path by following prev[ ] back to ${s}.`, { key: 'Done' });
  return F;
}

export function pathTo(prev, t) {
  const p = [];
  for (let x = t; x != null; x = prev[x]) p.unshift(x);
  return p;
}

/* ---------------- Topological sort (Kahn) ---------------- */
export function topoFrames(g) {
  const A = adj(g), V = g.nodes.map((n) => n.id), F = [];
  const indeg = {}; V.forEach((v) => (indeg[v] = 0));
  g.edges.forEach((e) => indeg[e.v]++);
  const out = [], removed = {}, gone = {};
  let q = sortIds(V.filter((v) => indeg[v] === 0));
  const snap = (cur, msg, extra = {}) => {
    const nc = {};
    V.forEach((v) => { if (removed[v]) nc[v] = 'done'; else if (q.includes(v)) nc[v] = 'front'; });
    if (cur != null) nc[cur] = 'cur';
    Object.assign(nc, extra.nc || {});
    const nl = {}; V.forEach((v) => { if (!removed[v]) nl[v] = 'in ' + indeg[v]; });
    F.push({ nc, ec: { ...gone, ...(extra.ec || {}) }, nl, msg, keyStep: extra.key, side: { V, indeg: { ...indeg }, queue: q.slice(), out: out.slice(), removed: { ...removed } } });
  };
  snap(null, `${b('Topological sort')} (Kahn's method). Count the ${b('in-degree')} of each vertex. Vertices with in-degree 0 have no prerequisite, so they go in the queue: ${q.join(', ') || 'none'}.`);
  while (q.length) {
    const u = q.shift(); removed[u] = 1; out.push(u);
    snap(u, `Remove ${b(u)} from the queue and write it in the order. Now delete its outgoing edges.`, { key: 'Take ' + u });
    for (const { v } of A[u]) {
      indeg[v]--; gone[ek(g, u, v)] = 'skip';
      let add = '';
      if (indeg[v] === 0) { q.push(v); q = sortIds(q); add = ` It becomes 0 → ${b('enqueue ' + v)}.`; }
      snap(u, `Edge ${u}→${v} removed: in-degree of ${v} drops to ${indeg[v]}.${add}`, { nc: indeg[v] === 0 ? { [v]: 'front new' } : {} });
    }
  }
  if (out.length < V.length) {
    const left = V.filter((v) => !removed[v]), nc = {}; left.forEach((v) => (nc[v] = 'bad'));
    snap(null, `Queue is empty but ${b(left.join(', '))} still ${left.length > 1 ? 'have' : 'has'} incoming edges. They lie on a ${b('cycle')}, so ${b('no topological order exists')}. The graph is not a DAG.`, { nc, key: 'Cycle!' });
  } else snap(null, `Done. ${b('Topological order: ' + out.join(' → '))}. Every edge points from left to right in this order.`, { key: 'Done' });
  return F;
}
