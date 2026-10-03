/* ===== Graph model =====
   g = { nodes: [{id,x,y}], edges: [{u,v,w}], directed, weighted }
   Edge text: "A-B:4 B-C"  (undirected)   "A>B C>D:2" (directed)  */

export function parseEdges(text, directedHint) {
  const toks = String(text || '').split(/[\s,;]+/).filter(Boolean);
  const edges = [], ids = [];
  let directed = !!directedHint, weighted = false;
  const add = (id) => { if (!ids.includes(id)) ids.push(id); };
  for (const t of toks) {
    const m = t.match(/^([A-Za-z0-9]+)(?:([->])([A-Za-z0-9]+))?(?::(-?\d+(?:\.\d+)?))?$/);
    if (!m) continue;
    add(m[1]);
    if (!m[3]) continue;
    add(m[3]);
    if (m[2] === '>') directed = true;
    const e = { u: m[1], v: m[3] };
    if (m[4] != null) { e.w = +m[4]; weighted = true; }
    edges.push(e);
  }
  return { ids, edges, directed, weighted };
}

export function edgesToText(g) {
  const s = g.directed ? '>' : '-';
  const used = new Set();
  g.edges.forEach((e) => { used.add(e.u); used.add(e.v); });
  const iso = g.nodes.filter((n) => !used.has(n.id)).map((n) => n.id);
  return g.edges.map((e) => e.u + s + e.v + (g.weighted && e.w != null ? ':' + e.w : '')).concat(iso).join(' ');
}

/* circle layout */
export function circleLayout(ids, r = 120, cx = 160, cy = 140) {
  const n = ids.length;
  return ids.map((id, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / Math.max(n, 1);
    return { id, x: Math.round(cx + (n === 1 ? 0 : r * Math.cos(a))), y: Math.round(cy + (n === 1 ? 0 : r * Math.sin(a))) };
  });
}

export function makeGraph(text, opts = {}) {
  const p = parseEdges(text, opts.directed);
  let pos = opts.pos;
  const nodes = pos ? p.ids.map((id) => ({ id, x: pos[id] ? pos[id][0] : 0, y: pos[id] ? pos[id][1] : 0 })) : circleLayout(p.ids, opts.r);
  if (opts.extra) opts.extra.forEach((id) => { if (!nodes.find((n) => n.id === id)) nodes.push({ id, x: pos[id][0], y: pos[id][1] }); });
  return { nodes, edges: p.edges, directed: opts.directed != null ? opts.directed || p.directed : p.directed, weighted: opts.weighted != null ? opts.weighted : p.weighted };
}

export function cloneGraph(g) {
  return { nodes: g.nodes.map((n) => ({ ...n })), edges: g.edges.map((e) => ({ ...e })), directed: g.directed, weighted: g.weighted };
}

export function ids(g) { return g.nodes.map((n) => n.id); }
export function sortIds(a) { return a.slice().sort((x, y) => (isNaN(x) || isNaN(y) ? String(x).localeCompare(String(y)) : x - y)); }

/* key used to colour an edge: undirected pairs are sorted */
export function ek(g, u, v) {
  if (g.directed) return u + '>' + v;
  return String(u) < String(v) ? u + '-' + v : v + '-' + u;
}

/* adjacency: neighbours sorted alphabetically (the convention used in every exam answer) */
export function adj(g) {
  const A = {};
  g.nodes.forEach((n) => (A[n.id] = []));
  g.edges.forEach((e) => {
    A[e.u].push({ v: e.v, w: e.w == null ? 1 : e.w });
    if (!g.directed && e.u !== e.v) A[e.v].push({ v: e.u, w: e.w == null ? 1 : e.w });
  });
  Object.keys(A).forEach((k) => A[k].sort((a, b) => (String(a.v) < String(b.v) ? -1 : String(a.v) > String(b.v) ? 1 : a.w - b.w)));
  return A;
}

export function degrees(g) {
  const d = {}, din = {}, dout = {};
  g.nodes.forEach((n) => { d[n.id] = 0; din[n.id] = 0; dout[n.id] = 0; });
  g.edges.forEach((e) => {
    if (g.directed) { dout[e.u]++; din[e.v]++; d[e.u]++; d[e.v]++; }
    else if (e.u === e.v) d[e.u] += 2;
    else { d[e.u]++; d[e.v]++; }
  });
  return { d, din, dout };
}

/* ---------- properties used by the type checker ---------- */
export function components(g, weak = true) {
  const A = {};
  g.nodes.forEach((n) => (A[n.id] = []));
  g.edges.forEach((e) => { A[e.u].push(e.v); if (!g.directed || weak) A[e.v].push(e.u); });
  const seen = {}, comps = [];
  g.nodes.forEach((n) => {
    if (seen[n.id]) return;
    const c = [], st = [n.id]; seen[n.id] = 1;
    while (st.length) { const x = st.pop(); c.push(x); A[x].forEach((y) => { if (!seen[y]) { seen[y] = 1; st.push(y); } }); }
    comps.push(sortIds(c));
  });
  return comps;
}

function reach(g, s) {
  const A = adj(g), seen = { [s]: 1 }, st = [s];
  while (st.length) { const x = st.pop(); A[x].forEach(({ v }) => { if (!seen[v]) { seen[v] = 1; st.push(v); } }); }
  return seen;
}

export function stronglyConnected(g) {
  if (!g.nodes.length) return true;
  const s = g.nodes[0].id;
  if (Object.keys(reach(g, s)).length !== g.nodes.length) return false;
  const rev = { ...g, edges: g.edges.map((e) => ({ u: e.v, v: e.u, w: e.w })) };
  return Object.keys(reach(rev, s)).length === g.nodes.length;
}

export function hasCycle(g) {
  if (g.edges.some((e) => e.u === e.v)) return true;
  if (g.directed) {
    const A = adj(g), col = {};
    const dfs = (u) => { col[u] = 1; for (const { v } of A[u]) { if (col[v] === 1) return true; if (!col[v] && dfs(v)) return true; } col[u] = 2; return false; };
    return g.nodes.some((n) => !col[n.id] && dfs(n.id));
  }
  // undirected: parallel edges count as a cycle of length 2
  const seenPair = {};
  for (const e of g.edges) { const k = ek(g, e.u, e.v); if (seenPair[k]) return true; seenPair[k] = 1; }
  return g.edges.length > g.nodes.length - components(g).length;
}

export function bipartite(g) {
  const A = {};
  g.nodes.forEach((n) => (A[n.id] = []));
  g.edges.forEach((e) => { A[e.u].push(e.v); A[e.v].push(e.u); });
  const col = {};
  for (const n of g.nodes) {
    if (col[n.id] != null) continue;
    col[n.id] = 0; const q = [n.id];
    while (q.length) {
      const x = q.shift();
      for (const y of A[x]) {
        if (col[y] == null) { col[y] = 1 - col[x]; q.push(y); }
        else if (col[y] === col[x]) return null;
      }
    }
  }
  return col;
}

export function properties(g) {
  const n = g.nodes.length, m = g.edges.length;
  const loops = g.edges.filter((e) => e.u === e.v).length;
  const pairs = {}; let parallel = 0;
  g.edges.forEach((e) => { const k = ek(g, e.u, e.v); if (pairs[k]) parallel++; pairs[k] = 1; });
  const simple = loops === 0 && parallel === 0;
  const { d, din, dout } = degrees(g);
  const comps = components(g);
  const connected = comps.length <= 1;
  const strong = g.directed ? stronglyConnected(g) : connected;
  const ds = Object.values(d);
  const regular = n > 0 && ds.every((x) => x === ds[0]) ? ds[0] : null;
  const maxE = g.directed ? n * (n - 1) : (n * (n - 1)) / 2;
  const complete = simple && n > 0 && Object.keys(pairs).length === maxE;
  const cyc = hasCycle(g);
  const bip = g.directed ? null : bipartite(g);
  const tree = !g.directed && simple && connected && m === n - 1;
  const forest = !g.directed && simple && !cyc;
  return { n, m, loops, parallel, simple, d, din, dout, comps, connected, strong, regular, complete, cyc, bip, tree, forest, sum: ds.reduce((a, b) => a + b, 0) };
}

/* ---------- presets (hand-placed so the figures read well) ---------- */
export const PRESETS = {
  intro: { text: 'A-B A-C B-C B-D C-E D-E D-F E-F', pos: { A: [40, 110], B: [130, 40], C: [130, 180], D: [240, 40], E: [240, 180], F: [330, 110] } },
  trav: { text: 'A-B A-C B-D B-E C-F E-F E-G F-G', pos: { A: [180, 30], B: [90, 110], C: [270, 110], D: [30, 200], E: [150, 200], F: [270, 200], G: [210, 280] } },
  exam: { text: 'A-B A-D B-C B-E C-F D-E E-F', pos: { A: [40, 40], B: [160, 40], C: [280, 40], D: [40, 160], E: [160, 160], F: [280, 160] } },
  digraph: { text: 'A>B A>C B>D C>B C>E D>E E>D', directed: true, pos: { A: [40, 110], B: [150, 40], C: [150, 180], D: [270, 40], E: [270, 180] } },
  dag: { text: 'A>C B>C B>D C>E D>F E>F E>G F>H', directed: true, pos: { A: [40, 40], B: [40, 170], C: [150, 40], D: [150, 170], E: [260, 40], F: [260, 170], G: [370, 40], H: [370, 170] } },
  wt: { text: 'A-B:4 A-C:2 B-C:1 B-D:5 C-D:8 C-E:10 D-E:2 D-F:6 E-F:3', pos: { A: [40, 120], B: [150, 40], C: [150, 200], D: [270, 40], E: [270, 200], F: [380, 120] } },
  mst: { text: 'A-B:7 A-D:5 B-C:8 B-D:9 B-E:7 C-E:5 D-E:15 D-F:6 E-F:8 E-G:9 F-G:11', pos: { A: [40, 40], B: [170, 40], C: [300, 40], D: [90, 150], E: [240, 150], F: [140, 260], G: [300, 260] } },
  comps: { text: 'A-B B-C A-C D-E F', pos: { A: [40, 50], B: [140, 50], C: [90, 140], D: [210, 50], E: [210, 140], F: [300, 95] } },
  tree: { text: 'A-B A-C B-D B-E C-F', pos: { A: [150, 30], B: [80, 110], C: [220, 110], D: [40, 190], E: [120, 190], F: [220, 190] } },
};

export function preset(name) {
  const p = PRESETS[name];
  if (!p) return makeGraph(name);
  return makeGraph(p.text, { pos: p.pos, directed: p.directed });
}
