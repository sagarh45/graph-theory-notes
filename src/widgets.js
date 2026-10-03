import { makeGraph, preset, PRESETS, adj, degrees, properties, edgesToText, parseEdges, circleLayout, cloneGraph, ek, sortIds } from './graph.js';
import { svgGraph, esc, adjMatrixHTML, adjListHTML, incidenceHTML, edgeListHTML } from './render.js';
import { Player, graphStage } from './player.js';
import { bfsFrames, dfsFrames, primFrames, kruskalFrames, dijkstraFrames, topoFrames } from './algos.js';
import { bfsSide, dfsSide, primSide, kruskalSide, dijkstraSide, topoSide } from './sides.js';

/* ---------- helpers ---------- */
function parsePos(s) {
  if (!s) return null;
  const P = {};
  s.split(',').forEach((t) => { const m = t.trim().split(/\s+/); if (m.length === 3) P[m[0]] = [+m[1], +m[2]]; });
  return P;
}
function parseMap(s) {
  const o = {};
  if (!s) return o;
  s.split(/\s+/).filter(Boolean).forEach((t) => { const i = t.lastIndexOf('='); o[t.slice(0, i)] = t.slice(i + 1); });
  return o;
}
export function graphFromEl(el) {
  const spec = el.dataset.g || el.dataset.fig;
  if (PRESETS[spec]) return preset(spec);
  const pos = parsePos(el.dataset.pos);
  return makeGraph(spec, { pos, directed: el.hasAttribute('data-dir') ? true : undefined });
}

/* ---------- static figure ---------- */
export function mountFig(el) {
  const g = graphFromEl(el);
  const nc = parseMap(el.dataset.nc), ec = parseMap(el.dataset.ec), nl = parseMap(el.dataset.nl);
  let bip = null;
  if (el.dataset.bip) { bip = {}; el.dataset.bip.split(/\s+/).forEach((t, i) => t.split('').forEach((c) => (bip[c] = i))); }
  el.innerHTML = `<div class="scroll">${svgGraph(g, { nc, ec, nl, bip, scale: el.dataset.scale ? +el.dataset.scale : 1 })}</div>` + (el.dataset.cap ? `<figcaption>${el.dataset.cap}</figcaption>` : '');
}

/* ---------- algorithm registry ---------- */
const ALG = {
  bfs: { run: (g, s) => bfsFrames(g, s), side: bfsSide, name: 'BFS', needsStart: true },
  dfs: { run: (g, s) => dfsFrames(g, s), side: dfsSide, name: 'DFS', needsStart: true },
  prim: { run: (g, s) => primFrames(g, s), side: primSide, name: "Prim's MST", needsStart: true, undirected: true, weighted: true },
  kruskal: { run: (g) => kruskalFrames(g), side: kruskalSide, name: "Kruskal's MST", undirected: true, weighted: true },
  dijkstra: { run: (g, s) => dijkstraFrames(g, s), side: dijkstraSide, name: 'Dijkstra', needsStart: true, weighted: true },
  topo: { run: (g) => topoFrames(g), side: topoSide, name: 'Topological sort', directed: true },
};
const LEGEND = {
  bfs: [['cur', 'being processed'], ['front', 'in the queue'], ['done', 'printed'], ['e-tree', 'BFS tree edge']],
  dfs: [['cur', 'current call'], ['front', 'on the stack'], ['done', 'finished'], ['e-tree', 'tree edge'], ['e-back', 'back edge (cycle)']],
  prim: [['cur', 'just added'], ['front', 'reachable (finite key)'], ['done', 'in the tree'], ['e-tree', 'MST edge'], ['e-cand', 'being checked']],
  kruskal: [['cur', 'ends of current edge'], ['done', 'touched by MST'], ['e-tree', 'taken'], ['e-rej', 'rejected (cycle)']],
  dijkstra: [['cur', 'just fixed'], ['front', 'tentative dist'], ['done', 'final'], ['e-tree', 'shortest-path tree'], ['e-cand', 'being relaxed']],
  topo: [['cur', 'just removed'], ['front', 'in the queue'], ['done', 'in the order'], ['bad', 'on a cycle']],
};
function legendHTML(alg) {
  return '<div class="legend">' + LEGEND[alg].map(([c, t]) => (c.startsWith('e-') ? `<span><i class="le ${c}"></i>${t}</span>` : `<span><i class="lg ${c}"></i>${t}</span>`)).join('') + '</div>';
}
function renderer(g, alg) {
  return (f, small) => ({ stage: graphStage(g, f, small), side: small ? '' : ALG[alg].side(f.side) });
}

/* ---------- fixed player ---------- */
export function mountPlay(el) {
  const g = graphFromEl(el), alg = el.dataset.play, s = el.dataset.s || g.nodes[0].id;
  const host = document.createElement('div');
  el.innerHTML = '';
  if (el.dataset.title) el.insertAdjacentHTML('beforeend', `<p class="lab-title"><span class="pill">Watch</span>${el.dataset.title}</p>`);
  el.appendChild(host);
  el.insertAdjacentHTML('beforeend', legendHTML(alg));
  Player(host, ALG[alg].run(g, s), renderer(g, alg));
}

/* ---------- interactive graph editor ---------- */
export function GraphEditor(host, g, onChange, opt = {}) {
  let sel = null, drag = null, moved = false;
  host.classList.add('editor');
  const wrap = document.createElement('div'); wrap.className = 'ed-stage'; host.appendChild(wrap);
  const tip = document.createElement('p'); tip.className = 'hint ed-tip'; host.appendChild(tip);
  const VB = [-10, -10, 420, 310];
  const nextId = () => { const used = new Set(g.nodes.map((n) => n.id)); for (const c of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') if (!used.has(c)) return c; return null; };
  function draw() {
    const nc = { ...(opt.nc ? opt.nc() : {}) };
    if (sel) nc[sel] = 'sel';
    wrap.innerHTML = svgGraph(g, { edit: true, nc, nl: opt.nl ? opt.nl() : {}, vb: VB, label: 'Editable graph' });
    tip.innerHTML = sel ? `Selected <b>${esc(sel)}</b>. Tap another vertex to add or remove the edge ${esc(sel)}${g.directed ? '→' : '–'}?, or tap ${esc(sel)} again to cancel.` : 'Tap empty space to add a vertex · tap two vertices to add/remove an edge · drag to move · tap an edge to delete it · double-tap a vertex to delete it.';
  }
  const pt = (e) => { const svg = wrap.querySelector('svg'); const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(svg.getScreenCTM().inverse()); return [Math.round(q.x), Math.round(q.y)]; };
  wrap.addEventListener('pointerdown', (e) => {
    const nd = e.target.closest('.nd');
    if (nd) { drag = g.nodes.find((n) => n.id === nd.dataset.n); moved = false; wrap.setPointerCapture(e.pointerId); e.preventDefault(); }
  });
  wrap.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const [x, y] = pt(e);
    if (Math.abs(x - drag.x) + Math.abs(y - drag.y) > 3) moved = true;
    if (moved) { drag.x = Math.max(VB[0] + 20, Math.min(VB[0] + VB[2] - 20, x)); drag.y = Math.max(VB[1] + 20, Math.min(VB[1] + VB[3] - 20, y)); draw(); }
  });
  wrap.addEventListener('pointerup', (e) => {
    if (drag) {
      const id = drag.id; drag = null;
      if (moved) { onChange(false); return; }
      if (sel === null) sel = id;
      else if (sel === id) sel = null;
      else {
        const a = sel, b = id;
        const idx = g.edges.findIndex((x) => (x.u === a && x.v === b) || (!g.directed && x.u === b && x.v === a));
        if (idx >= 0) g.edges.splice(idx, 1);
        else g.edges.push(g.weighted ? { u: a, v: b, w: opt.weight ? opt.weight() : 1 } : { u: a, v: b });
        sel = null; draw(); onChange(true); return;
      }
      draw(); return;
    }
    const eh = e.target.closest('.edge-hit');
    if (eh) { g.edges.splice(+eh.dataset.e, 1); sel = null; draw(); onChange(true); return; }
    if (e.target.closest('.bg-hit')) {
      if (sel) { sel = null; draw(); return; }
      const id = nextId(); if (!id) return;
      const [x, y] = pt(e); g.nodes.push({ id, x, y }); draw(); onChange(true);
    }
  });
  wrap.addEventListener('dblclick', (e) => {
    const nd = e.target.closest('.nd'); if (!nd || g.nodes.length <= 1) return;
    const id = nd.dataset.n;
    g.nodes = g.nodes.filter((n) => n.id !== id); g.edges = g.edges.filter((x) => x.u !== id && x.v !== id);
    sel = null; draw(); onChange(true);
  });
  draw();
  return { draw, set(ng) { g = ng; sel = null; draw(); }, get g() { return g; } };
}

function presetOptions(list) {
  return list.map(([k, t]) => `<option value="${k}">${t}</option>`).join('');
}

/* ---------- traversal + algorithm lab ---------- */
const LAB_PRESETS = {
  trav: [['trav', 'Seven-vertex graph'], ['exam', 'Grid (6 vertices)'], ['digraph', 'Directed graph'], ['comps', 'Disconnected graph'], ['tree', 'Tree']],
  algo: [['wt', 'Weighted graph (6)'], ['mst', 'Weighted graph (7)'], ['dag', 'DAG (course plan)'], ['digraph', 'Directed with cycle']],
};
export function mountLab(el) {
  const kind = el.dataset.lab; // trav | algo
  const algs = kind === 'trav' ? ['bfs', 'dfs'] : ['dijkstra', 'prim', 'kruskal', 'topo'];
  let alg = el.dataset.alg || algs[0];
  let g = cloneGraph(preset(LAB_PRESETS[kind][0][0]));
  el.innerHTML = `<p class="lab-title"><span class="pill">Try it</span>${kind === 'trav' ? 'Traversal lab — build any graph and run BFS or DFS' : 'Algorithm lab — shortest path, MST and topological sort'}</p>
  <div class="lab-bar"><span class="seg" role="group" aria-label="Algorithm">${algs.map((a) => `<button type="button" class="chip" data-a="${a}">${ALG[a].name}</button>`).join('')}</span></div>
  <div class="lab-bar"><label class="ord">Graph <select class="ps">${presetOptions(LAB_PRESETS[kind])}<option value="custom">Custom (your edges)</option></select></label>
  <label class="ord st-wrap">Start <select class="st"></select></label>
  <label class="ord"><input type="checkbox" class="dir"> Directed</label>
  ${kind === 'algo' ? '<label class="ord w-wrap">New edge weight <input type="number" class="nw" value="5" min="-9" max="99"></label>' : ''}
  <button type="button" class="primary run">Run ▶</button></div>
  <details class="ed-box"><summary>Edit the graph</summary><div class="ed-host"></div>
  <div class="lab-bar"><input class="et" aria-label="Edge list" spellcheck="false"><button type="button" class="apply">Apply edges</button><button type="button" class="clear">Clear edges</button></div>
  <p class="hint">Edge list format: <code>A-B</code> undirected, <code>A&gt;B</code> directed, <code>A-B:4</code> weight 4. A lone letter adds a vertex with no edges.</p></details>
  <div class="ph"></div><div class="lg-host"></div>`;
  const $ = (s) => el.querySelector(s);
  const ps = $('.ps'), st = $('.st'), dir = $('.dir'), et = $('.et'), phHost = $('.ph');
  let player = null;
  const ed = GraphEditor($('.ed-host'), g, (structural) => { if (structural) { ps.value = 'custom'; } syncText(); fillStart(); run(); }, { weight: () => +(el.querySelector('.nw') || { value: 1 }).value || 1 });
  function syncText() { et.value = edgesToText(g); dir.checked = g.directed; }
  function fillStart() {
    const cur = st.value, V = sortIds(g.nodes.map((n) => n.id));
    st.innerHTML = V.map((v) => `<option>${esc(v)}</option>`).join('');
    if (V.includes(cur)) st.value = cur;
  }
  function setAlg(a) {
    alg = a;
    el.querySelectorAll('.seg .chip').forEach((c) => c.classList.toggle('on', c.dataset.a === a));
    $('.st-wrap').hidden = !ALG[a].needsStart;
    // pick a sensible graph for the algorithm
    const want = ALG[a].directed ? 'dag' : ALG[a].weighted ? (a === 'dijkstra' ? 'wt' : 'mst') : null;
    if (kind === 'algo' && want && ps.value !== 'custom' && ((ALG[a].directed && !g.directed) || (!ALG[a].directed && g.directed) || (ALG[a].weighted && !g.weighted))) loadPreset(want);
    run();
  }
  function loadPreset(k) {
    ps.value = k; g = cloneGraph(preset(k)); ed.set(g); syncText(); fillStart(); st.value = sortIds(g.nodes.map((n) => n.id))[0];
  }
  function run() {
    let note = '';
    if (ALG[alg].undirected && g.directed) note = `${ALG[alg].name} works on <b>undirected</b> graphs. Directed edges are treated as undirected here.`;
    if (ALG[alg].directed && !g.directed) note = 'Topological sort needs a <b>directed</b> graph. Tick “Directed” or choose the DAG preset.';
    const gg = ALG[alg].undirected && g.directed ? { ...g, directed: false } : g;
    if (ALG[alg].directed && !g.directed) { phHost.innerHTML = `<div class="trap"><b>Not possible:</b> ${note}</div>`; player = null; $('.lg-host').innerHTML = ''; return; }
    if (!gg.nodes.length) { phHost.innerHTML = '<p class="empty">Add a vertex to start.</p>'; player = null; return; }
    const s = st.value || gg.nodes[0].id;
    const frames = ALG[alg].run(gg, s);
    if (note) frames.forEach((f) => (f.msg = f.msg + `<br><span class="muted">${note}</span>`));
    if (!player || !phHost.querySelector('.player')) { phHost.innerHTML = '<div></div>'; player = Player(phHost.firstChild, frames, renderer(gg, alg)); }
    else { phHost.innerHTML = '<div></div>'; player = Player(phHost.firstChild, frames, renderer(gg, alg)); }
    $('.lg-host').innerHTML = legendHTML(alg);
  }
  el.querySelectorAll('.seg .chip').forEach((c) => (c.onclick = () => setAlg(c.dataset.a)));
  ps.onchange = () => { if (ps.value !== 'custom') { loadPreset(ps.value); run(); } };
  st.onchange = run;
  dir.onchange = () => { g.directed = dir.checked; ps.value = 'custom'; ed.draw(); syncText(); run(); };
  $('.run').onclick = () => { run(); };
  $('.apply').onclick = () => {
    const p = parseEdges(et.value, dir.checked);
    if (!p.ids.length) return;
    const old = {}; g.nodes.forEach((n) => (old[n.id] = n));
    const lay = circleLayout(p.ids, 115, 200, 145);
    g.nodes = p.ids.map((id, i) => (old[id] ? { ...old[id] } : lay[i]));
    g.edges = p.edges; g.directed = p.directed; g.weighted = p.weighted || g.weighted;
    ps.value = 'custom'; ed.set(g); syncText(); fillStart(); run();
  };
  $('.clear').onclick = () => { g.edges = []; ps.value = 'custom'; ed.set(g); syncText(); run(); };
  syncText(); fillStart(); setAlg(alg);
}

/* ---------- representation lab ---------- */
export function mountRepr(el) {
  let g = cloneGraph(preset('intro'));
  el.innerHTML = `<p class="lab-title"><span class="pill">Try it</span>Representation lab — change the graph, watch all four forms update</p>
  <div class="lab-bar"><label class="ord">Start from <select class="ps"><option value="intro">Undirected graph</option><option value="digraph">Directed graph</option><option value="wt">Weighted graph</option><option value="comps">Disconnected graph</option></select></label>
  <label class="ord"><input type="checkbox" class="dir"> Directed</label><label class="ord"><input type="checkbox" class="wtd"> Weighted</label>
  <label class="ord w-wrap">New edge weight <input type="number" class="nw" value="3" min="-9" max="99"></label></div>
  <div class="repr-grid"><div class="ed-host"></div><div class="rp-out"><div class="seg rp-tabs" role="tablist">${['Adjacency matrix', 'Adjacency list', 'Incidence matrix', 'Edge list'].map((t, i) => `<button type="button" class="chip${i === 0 ? ' on' : ''}" data-t="${i}">${t}</button>`).join('')}</div><div class="rp-body"></div><div class="rp-cost"></div></div></div>`;
  const $ = (s) => el.querySelector(s);
  let tab = 0;
  const ed = GraphEditor($('.ed-host'), g, () => out(), { weight: () => +$('.nw').value || 1 });
  function out() {
    const n = g.nodes.length, m = g.edges.length, A = adj(g);
    const body = [adjMatrixHTML(g), adjListHTML(g, A), incidenceHTML(g), edgeListHTML(g)][tab];
    $('.rp-body').innerHTML = `<div class="scroll-x">${body}</div>`;
    const cells = [n * n, n + (g.directed ? m : 2 * m), n * m, (g.weighted ? 3 : 2) * m];
    const what = ['n × n cells', 'n heads + ' + (g.directed ? 'm' : '2m') + ' list nodes', 'n × m cells', (g.weighted ? '3' : '2') + ' numbers per edge'];
    $('.rp-cost').innerHTML = `<b>n = ${n}</b>, <b>m = ${m}</b> · this form stores <b>${cells[tab]}</b> values (${what[tab]}).` + (tab === 0 ? (g.directed ? ' Directed: the matrix is usually <b>not symmetric</b>.' : ' Undirected: the matrix is <b>symmetric</b> about the diagonal.') : '') + (tab === 2 && g.directed ? ' Convention: +1 where the edge starts, −1 where it ends.' : '');
    $('.dir').checked = g.directed; $('.wtd').checked = g.weighted; $('.w-wrap').hidden = !g.weighted;
    // hover a matrix cell → highlight the edge
    el.querySelectorAll('.rp-body td[data-u]').forEach((td) => {
      td.onmouseenter = () => { const nc = { [td.dataset.u]: 'cur', [td.dataset.v]: 'cur' }; ed.draw(); el.querySelectorAll('.ed-stage .nd').forEach((x) => { if (nc[x.dataset.n]) x.classList.add('cur'); }); };
      td.onmouseleave = () => ed.draw();
    });
  }
  el.querySelectorAll('.rp-tabs .chip').forEach((c) => (c.onclick = () => { tab = +c.dataset.t; el.querySelectorAll('.rp-tabs .chip').forEach((x) => x.classList.toggle('on', x === c)); out(); }));
  $('.ps').onchange = () => { g = cloneGraph(preset($('.ps').value)); ed.set(g); out(); };
  $('.dir').onchange = () => { g.directed = $('.dir').checked; ed.draw(); out(); };
  $('.wtd').onchange = () => { g.weighted = $('.wtd').checked; if (g.weighted) g.edges.forEach((e) => { if (e.w == null) e.w = 1; }); ed.draw(); out(); };
  out();
}

/* ---------- terminology explorer ---------- */
export function mountExplorer(el) {
  const GS = {
    u: makeGraph('A-B A-C B-C B-D C-E D-E E-F G', { pos: { A: [40, 60], B: [140, 30], C: [120, 150], D: [250, 50], E: [240, 170], F: [340, 190], G: [350, 60] } }),
    d: makeGraph('A>B A>C B>C C>D D>B D>E F>E', { pos: { A: [40, 100], B: [150, 40], C: [150, 170], D: [260, 100], E: [360, 100], F: [360, 200] } }),
  };
  let mode = 'u', a = null, b = null;
  el.innerHTML = `<p class="lab-title"><span class="pill">Try it</span>Term explorer — tap a vertex, then tap a second one</p>
  <div class="lab-bar"><span class="seg"><button type="button" class="chip on" data-m="u">Undirected</button><button type="button" class="chip" data-m="d">Directed</button></span><button type="button" class="reset">Clear selection</button></div>
  <div class="terms-grid"><div class="stage tx-stage"></div><div class="tx-panel"></div></div>`;
  const stage = el.querySelector('.tx-stage'), panel = el.querySelector('.tx-panel');
  function allPaths(g, s, t, limit = 12) {
    const A = adj(g), res = [], path = [s], on = { [s]: 1 };
    (function go(u) {
      if (res.length >= limit) return;
      if (u === t) { res.push(path.slice()); return; }
      for (const { v } of A[u]) if (!on[v]) { on[v] = 1; path.push(v); go(v); path.pop(); on[v] = 0; }
    })(s);
    return res.sort((x, y) => x.length - y.length);
  }
  function draw() {
    const g = GS[mode], A = adj(g), { d, din, dout } = degrees(g);
    const nc = {}, ec = {};
    if (a) {
      nc[a] = 'cur';
      if (!b) { A[a].forEach(({ v }) => { nc[v] = nc[v] || 'front'; ec[ek(g, a, v)] = 'cand'; }); }
    }
    let paths = [];
    if (a && b) {
      paths = allPaths(g, a, b);
      nc[b] = 'cur';
      if (paths[0]) paths[0].forEach((x, i) => { if (i) ec[ek(g, paths[0][i - 1], x)] = 'tree'; if (x !== a && x !== b) nc[x] = 'path'; });
    }
    stage.innerHTML = svgGraph(g, { nc, ec, click: true });
    if (!a) {
      const props = properties(g);
      panel.innerHTML = `<table class="kv"><tr><th>Vertices (order)</th><td>${g.nodes.length}: ${g.nodes.map((n) => n.id).join(', ')}</td></tr><tr><th>Edges (size)</th><td>${g.edges.length}</td></tr>
      <tr><th>Sum of degrees</th><td>${props.sum} = 2 × ${g.edges.length} ✓</td></tr>
      ${mode === 'u' ? `<tr><th>Isolated vertex</th><td>${g.nodes.filter((n) => d[n.id] === 0).map((n) => n.id).join(', ') || 'none'}</td></tr><tr><th>Pendant vertex</th><td>${g.nodes.filter((n) => d[n.id] === 1).map((n) => n.id).join(', ') || 'none'}</td></tr><tr><th>Components</th><td>${props.comps.length}: ${props.comps.map((c) => '{' + c.join(',') + '}').join(' ')}</td></tr>` :
          `<tr><th>Source (in = 0)</th><td>${g.nodes.filter((n) => din[n.id] === 0).map((n) => n.id).join(', ') || 'none'}</td></tr><tr><th>Sink (out = 0)</th><td>${g.nodes.filter((n) => dout[n.id] === 0).map((n) => n.id).join(', ') || 'none'}</td></tr><tr><th>Strongly connected?</th><td>${props.strong ? 'Yes' : 'No — e.g. nothing leaves E'}</td></tr>`}</table><p class="hint">Tap a vertex to see its degree, neighbours and incident edges.</p>`;
      return;
    }
    const inc = g.edges.filter((e) => e.u === a || e.v === a).map((e) => e.u + (g.directed ? '→' : '–') + e.v);
    let h = `<table class="kv"><tr><th>Vertex</th><td><b>${a}</b></td></tr>`;
    if (mode === 'u') h += `<tr><th>Degree</th><td>${d[a]}${d[a] === 0 ? ' → <b>isolated</b>' : d[a] === 1 ? ' → <b>pendant</b>' : ''}</td></tr><tr><th>Adjacent vertices</th><td>${A[a].map((x) => x.v).join(', ') || 'none'}</td></tr>`;
    else h += `<tr><th>In-degree</th><td>${din[a]}${din[a] === 0 ? ' → <b>source</b>' : ''}</td></tr><tr><th>Out-degree</th><td>${dout[a]}${dout[a] === 0 ? ' → <b>sink</b>' : ''}</td></tr><tr><th>Successors</th><td>${A[a].map((x) => x.v).join(', ') || 'none'}</td></tr><tr><th>Predecessors</th><td>${g.edges.filter((e) => e.v === a).map((e) => e.u).join(', ') || 'none'}</td></tr>`;
    h += `<tr><th>Incident edges</th><td>${inc.join(', ') || 'none'}</td></tr>`;
    if (b) {
      h += `<tr><th>Second vertex</th><td><b>${b}</b>${A[a].some((x) => x.v === b) ? ' (adjacent to ' + a + ')' : ''}</td></tr>`;
      h += paths.length ? `<tr><th>Simple paths</th><td>${paths.length}${paths.length >= 12 ? '+' : ''} found. Shortest (length ${paths[0].length - 1}):<br><b>${paths[0].join(' → ')}</b>${paths.length > 1 ? '<br><span class="muted">Others: ' + paths.slice(1, 5).map((p) => p.join('→')).join(' · ') + (paths.length > 5 ? ' …' : '') + '</span>' : ''}</td></tr>` : `<tr><th>Path</th><td><b>No path</b> from ${a} to ${b}${mode === 'u' ? ' — they are in different components.' : ' — edges point the wrong way.'}</td></tr>`;
    }
    panel.innerHTML = h + '</table>' + (b ? '' : '<p class="hint">Highlighted: the neighbours of ' + a + '. Tap a second vertex to see the paths between them.</p>');
  }
  stage.addEventListener('click', (e) => {
    const nd = e.target.closest('.nd'); if (!nd) return;
    const id = nd.dataset.n;
    if (!a || b) { a = id; b = null; } else if (id === a) a = null; else b = id;
    draw();
  });
  el.querySelectorAll('[data-m]').forEach((c) => (c.onclick = () => { mode = c.dataset.m; a = b = null; el.querySelectorAll('[data-m]').forEach((x) => x.classList.toggle('on', x === c)); draw(); }));
  el.querySelector('.reset').onclick = () => { a = b = null; draw(); };
  draw();
}

/* ---------- complete graph Kn ---------- */
export function mountKn(el) {
  el.innerHTML = `<p class="lab-title"><span class="pill">Try it</span>Complete graph K<sub>n</sub></p><div class="lab-bar"><label class="ord">n = <input type="range" min="1" max="9" value="5" class="kn"></label><b class="knv">5</b><label class="ord"><input type="checkbox" class="kd"> Directed (both directions)</label></div><div class="stage kn-stage"></div><p class="msg kn-msg"></p>`;
  const r = el.querySelector('.kn'), dirc = el.querySelector('.kd');
  function draw() {
    const n = +r.value, V = 'ABCDEFGHI'.slice(0, n).split('');
    const nodes = circleLayout(V, 100, 130, 120), edges = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { edges.push({ u: V[i], v: V[j] }); if (dirc.checked) edges.push({ u: V[j], v: V[i] }); }
    const g = { nodes, edges, directed: dirc.checked, weighted: false };
    el.querySelector('.knv').textContent = n;
    el.querySelector('.kn-stage').innerHTML = svgGraph(g, {});
    const m = dirc.checked ? n * (n - 1) : (n * (n - 1)) / 2;
    el.querySelector('.kn-msg').innerHTML = dirc.checked ? `Every ordered pair has an edge: <b>n(n − 1) = ${n} × ${n - 1} = ${m}</b> edges. Each vertex has in-degree = out-degree = ${n - 1}.` : `Every pair is joined: <b>n(n − 1)/2 = ${n} × ${n - 1} / 2 = ${m}</b> edges. Every vertex has degree ${n - 1}, so K<sub>${n}</sub> is ${n - 1}-regular.`;
  }
  r.oninput = draw; dirc.onchange = draw; draw();
}

/* ---------- type checker ---------- */
const CHECK_PRESETS = [
  ['A-B B-C C-D D-A', 'Cycle C4'],
  ['A-B A-C A-D B-C B-D C-D', 'Complete K4'],
  ['A-B A-C B-D B-E C-F', 'Tree'],
  ['A-X A-Y B-X B-Y C-X C-Y', 'Complete bipartite K3,3'],
  ['A-B A-B B-C C-C', 'Multigraph with a loop'],
  ['A-B B-C D-E', 'Disconnected'],
  ['A>B B>C C>A', 'Directed cycle'],
  ['A>B A>C B>D C>D', 'DAG'],
];
export function mountChecker(el) {
  el.innerHTML = `<p class="lab-title"><span class="pill">Try it</span>Graph type checker — type edges, get every property</p>
  <div class="lab-bar"><select class="cp" aria-label="Example graphs">${CHECK_PRESETS.map(([t, n]) => `<option value="${t}">${n}</option>`).join('')}</select><input class="ci" spellcheck="false" aria-label="Edges"><button type="button" class="primary cg">Check</button></div>
  <div class="terms-grid"><div class="stage ck-stage"></div><div class="ck-out"></div></div>`;
  const ci = el.querySelector('.ci'), cp = el.querySelector('.cp');
  ci.value = cp.value;
  function check() {
    const p = parseEdges(ci.value);
    if (!p.ids.length) return;
    const g = { nodes: circleLayout(p.ids, 95, 130, 120), edges: p.edges, directed: p.directed, weighted: p.weighted };
    const P = properties(g);
    const pill = (ok, t) => `<span class="verdict ${ok ? 'yes' : 'no'}">${ok ? '✓' : '✗'} ${t}</span>`;
    let bip = null;
    if (P.bip) bip = P.bip;
    el.querySelector('.ck-stage').innerHTML = svgGraph(g, { bip });
    const degs = sortIds(Object.keys(P.d)).map((v) => (g.directed ? `${v}: in ${P.din[v]}, out ${P.dout[v]}` : `${v}: ${P.d[v]}`)).join(' · ');
    el.querySelector('.ck-out').innerHTML = `<table class="kv">
      <tr><th>Order / size</th><td>n = ${P.n}, m = ${P.m}</td></tr>
      <tr><th>Degrees</th><td>${degs}<br><span class="muted">Sum = ${P.sum} = 2m ✓</span></td></tr></table>
      <div class="pills">${[
        [!g.directed, 'Undirected'], [g.directed, 'Directed'], [P.simple, 'Simple'], [P.loops > 0, 'Has loop'], [P.parallel > 0, 'Parallel edges'],
        g.directed ? [P.strong, 'Strongly connected'] : [P.connected, 'Connected'],
        g.directed ? [P.connected && !P.strong, 'Weakly connected only'] : [!P.connected, P.comps.length + ' components'],
        [P.complete, 'Complete'], [P.regular != null, (P.regular != null ? P.regular : 'k') + '-regular'], [P.cyc, 'Has a cycle'],
        ...(g.directed ? [[!P.cyc, 'DAG']] : [[!!P.bip, 'Bipartite'], [P.tree, 'Tree'], [P.forest && !P.tree, 'Forest']]),
      ].filter((x) => x[0] || !['Has loop', 'Parallel edges', 'Weakly connected only', 'Directed', 'Undirected'].includes(x[1]) && !/components$/.test(x[1])).map(([ok, t]) => pill(ok, t)).join('')}</div>
      ${P.bip && !g.directed && P.m ? '<p class="hint">Bipartite colouring shown: every edge joins a light vertex to a dark vertex.</p>' : ''}`;
  }
  cp.onchange = () => { ci.value = cp.value; check(); };
  el.querySelector('.cg').onclick = check;
  ci.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
  check();
}

/* ---------- handshake lab ---------- */
export function mountHandshake(el) {
  const g = makeGraph('A-B B-C C-D D-A A-C E', { pos: { A: [80, 60], B: [220, 50], C: [250, 180], D: [90, 190], E: [340, 110] } });
  el.innerHTML = `<p class="lab-title"><span class="pill">Try it</span>Handshake lab — add or remove edges and watch the degree sum</p><div class="terms-grid"><div class="hs-ed"></div><div class="hs-out"></div></div>`;
  const out = () => {
    const { d } = degrees(g), V = g.nodes.map((n) => n.id), sum = V.reduce((a, v) => a + d[v], 0), odd = V.filter((v) => d[v] % 2);
    el.querySelector('.hs-out').innerHTML = `<table class="arr"><tr class="ix"><th></th>${V.map((v) => `<td>${v}</td>`).join('')}</tr><tr><th>deg</th>${V.map((v) => `<td><span class="cell ${d[v] % 2 ? 'odd' : ''}">${d[v]}</span></td>`).join('')}</tr></table>
    <p class="formula hs-f">Σ deg = ${V.map((v) => d[v]).join(' + ')} = <b>${sum}</b></p><p class="formula hs-f">2 × |E| = 2 × ${g.edges.length} = <b>${2 * g.edges.length}</b> ✓</p>
    <p>Odd-degree vertices: <b>${odd.length ? odd.join(', ') : 'none'}</b> → count = <b>${odd.length}</b> (always even).</p>`;
  };
  GraphEditor(el.querySelector('.hs-ed'), g, out, { nl: () => { const { d } = degrees(g); return Object.fromEntries(g.nodes.map((n) => [n.id, 'deg ' + d[n.id]])); }, nc: () => { const { d } = degrees(g); return Object.fromEntries(g.nodes.filter((n) => d[n.id] % 2).map((n) => [n.id, 'odd'])); } });
  out();
}

/* ---------- code blocks ---------- */
function highlightC(src) {
  const KW = /^(if|else|while|for|do|return|switch|case|break|continue|struct|sizeof|typedef|default)$/, TY = /^(int|char|void|float|double|long|unsigned|NULL|INT_MAX|bool)$/;
  return src.split('\n').map((line) => {
    let out = '', m;
    const re = /(\/\*.*?\*\/|\/\*.*$|\/\/.*$)|("(?:\\.|[^"])*"|'(?:\\.|[^'])')|(#\w+)|(\b\d+\b)|(\b[A-Za-z_]\w*\b)(?=\s*\()|(\b[A-Za-z_]\w*\b)|([^\w"'\/#]+|\/)/g;
    while ((m = re.exec(line))) {
      if (m[1]) out += '<span class="c-com">' + esc(m[1]) + '</span>';
      else if (m[2]) out += '<span class="c-str">' + esc(m[2]) + '</span>';
      else if (m[3]) out += '<span class="c-pp">' + esc(m[3]) + '</span>';
      else if (m[4]) out += '<span class="c-num">' + m[4] + '</span>';
      else if (m[5]) out += KW.test(m[5]) ? '<span class="c-kw">' + m[5] + '</span>' : '<span class="c-fn">' + m[5] + '</span>';
      else if (m[6]) out += KW.test(m[6]) ? '<span class="c-kw">' + m[6] + '</span>' : TY.test(m[6]) ? '<span class="c-ty">' + m[6] + '</span>' : m[6];
      else out += esc(m[7]);
    }
    return out;
  }).join('\n');
}
export function mountCode(pre) {
  const raw = pre.textContent;
  pre.innerHTML = '<code>' + highlightC(raw) + '</code>';
  const bt = document.createElement('button'); bt.type = 'button'; bt.className = 'copy'; bt.textContent = 'Copy';
  bt.onclick = () => {
    const done = () => { bt.textContent = 'Copied'; setTimeout(() => (bt.textContent = 'Copy'), 1500); };
    const sel = () => { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); bt.textContent = 'Press Ctrl+C'; };
    try { navigator.clipboard.writeText(raw).then(done, sel); } catch (e) { sel(); }
  };
  pre.parentNode.insertBefore(bt, pre);
}

/* ---------- static representation figure: graph + table side by side ---------- */
export function mountRep(el) {
  const g = graphFromEl(el), kind = el.dataset.rep;
  if (el.hasAttribute('data-w')) g.weighted = true;
  const body = kind === 'adj' ? adjMatrixHTML(g) : kind === 'list' ? adjListHTML(g, adj(g)) : kind === 'inc' ? incidenceHTML(g) : edgeListHTML(g);
  el.innerHTML = `<div class="rep-pair"><div class="scroll">${svgGraph(g, {})}</div><div class="scroll-x">${body}</div></div>` + (el.dataset.cap ? `<figcaption>${el.dataset.cap}</figcaption>` : '');
}

/* ---------- dry-run tables (exam style) ---------- */
export function mountDry(el) {
  const g = graphFromEl(el), s = el.dataset.s || g.nodes[0].id, A = adj(g), kind = el.dataset.dry;
  let rows = [], head;
  if (kind === 'bfs') {
    head = ['Step', 'Dequeue', 'Unvisited neighbours → enqueue', 'Queue after (front … rear)', 'Output so far'];
    const vis = { [s]: 1 }, q = [s], out = [];
    rows.push(['0', '—', 'enqueue ' + s + ' (start)', q.join(' '), '']);
    let k = 1;
    while (q.length) {
      const u = q.shift(); out.push(u);
      const add = A[u].map((x) => x.v).filter((v) => !vis[v]);
      add.forEach((v) => { vis[v] = 1; q.push(v); });
      rows.push([String(k++), u, add.length ? add.join(', ') : '—', q.join(' ') || 'empty', out.join(' ')]);
    }
  } else {
    head = ['Step', 'Pop', 'Action', 'Push (reverse order)', 'Stack after (bottom … top)', 'Output so far'];
    const vis = {}, st = [s], out = [];
    rows.push(['0', '—', 'push start ' + s, s, st.join(' '), '']);
    let k = 1;
    while (st.length) {
      const u = st.pop();
      if (vis[u]) { rows.push([String(k++), u, 'already visited → skip', '—', st.join(' ') || 'empty', out.join(' ')]); continue; }
      vis[u] = 1; out.push(u);
      const add = A[u].map((x) => x.v).filter((v) => !vis[v]).reverse();
      add.forEach((v) => st.push(v));
      rows.push([String(k++), u, 'visit, print ' + u, add.length ? add.join(', ') : '—', st.join(' ') || 'empty', out.join(' ')]);
    }
  }
  el.innerHTML = `<div class="tbl"><table class="t dry"><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td${i === r.length - 1 ? ' class="o"' : ''}>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
