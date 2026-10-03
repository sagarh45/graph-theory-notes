/* [question, options, correctIndex, why] */
export const QUIZ = {
  basics: [
    ['A graph G = (V, E) has 6 vertices and 8 edges. What is the sum of all degrees?', ['6', '8', '14', '16'], 3, 'Handshake rule: every edge adds 1 to the degree of each of its two ends, so Σ deg = 2|E| = 16.'],
    ['Which of these can NEVER be true for an undirected graph?', ['It has 2 vertices of odd degree', 'It has 3 vertices of odd degree', 'It has 0 vertices of odd degree', 'It has 4 vertices of odd degree'], 1, 'The number of odd-degree vertices is always even, because the total degree 2|E| is even.'],
    ['What is the maximum number of edges in a simple undirected graph with 7 vertices?', ['7', '14', '21', '42'], 2, 'n(n − 1)/2 = 7 × 6 / 2 = 21. For a directed graph it would be n(n − 1) = 42.'],
    ['In a directed graph the edge (u, v) means…', ['you can go from v to u', 'you can go from u to v only', 'you can go both ways', 'u and v are the same vertex'], 1, 'A directed edge is an ordered pair: tail u, head v. Travel is allowed only from u to v.'],
    ['A tree with n vertices is a graph that is…', ['connected with n edges', 'connected and has no cycle', 'any graph with a root', 'complete'], 1, 'A tree is a connected acyclic graph. It always has exactly n − 1 edges.'],
  ],
  terms: [
    ['A vertex with degree 1 is called…', ['isolated', 'pendant', 'source', 'sink'], 1, 'Pendant (or leaf) vertex = degree 1. Isolated = degree 0.'],
    ['In a digraph, a vertex with in-degree 0 is a…', ['sink', 'pendant', 'source', 'loop'], 2, 'Nothing enters it, so it is a source. Out-degree 0 is a sink.'],
    ['A path in which no vertex repeats is a…', ['walk', 'simple path', 'cycle', 'loop'], 1, 'A walk may repeat vertices and edges; a simple path repeats neither.'],
    ['An edge from a vertex to itself is a…', ['parallel edge', 'bridge', 'loop (self-loop)', 'cycle of length 2'], 2, 'A self-loop. It adds 2 to the degree of that vertex in an undirected graph.'],
    ['Two edges with the same two end vertices are called…', ['adjacent edges', 'parallel (multiple) edges', 'incident edges', 'loops'], 1, 'Parallel or multiple edges. A graph with them is a multigraph.'],
    ['The length of the path A → B → D → E is…', ['4', '3', '2', '5'], 1, 'Path length counts edges, not vertices: 4 vertices, 3 edges.'],
  ],
  types: [
    ['How many edges does K₆ (complete graph on 6 vertices) have?', ['6', '12', '15', '30'], 2, '6 × 5 / 2 = 15. Every vertex has degree 5.'],
    ['A graph where every vertex has degree 3 is called…', ['complete', '3-regular', 'bipartite', 'a tree'], 1, 'k-regular means every vertex has the same degree k.'],
    ['Which graph is NOT bipartite?', ['A path with 4 vertices', 'A cycle with 4 vertices', 'A cycle with 5 vertices', 'A tree'], 2, 'A graph is bipartite exactly when it has no odd-length cycle. C₅ has an odd cycle.'],
    ['A directed graph in which every vertex can reach every other vertex is…', ['weakly connected', 'strongly connected', 'complete', 'acyclic'], 1, 'Strongly connected: a directed path u → v and v → u for every pair.'],
    ['A DAG is…', ['a directed graph with no cycle', 'a dense acyclic graph', 'an undirected tree', 'a graph with all weights positive'], 0, 'Directed Acyclic Graph. Only DAGs have a topological order.'],
    ['Two graphs are isomorphic if…', ['they look the same on paper', 'they have the same number of vertices only', 'there is a one-to-one mapping of vertices that keeps every edge', 'they have the same weights'], 2, 'Same structure, different drawing. Equal vertex count, edge count and degree sequence are necessary, but not enough.'],
  ],
  repr: [
    ['Space used by an adjacency matrix for n vertices is…', ['O(n)', 'O(n + e)', 'O(n²)', 'O(e²)'], 2, 'n × n cells, whatever the number of edges.'],
    ['For a sparse graph (few edges), the best representation is usually…', ['adjacency matrix', 'adjacency list', 'incidence matrix', 'a 2-D array of size e × e'], 1, 'The list uses O(n + e) memory and visits only real neighbours.'],
    ['The adjacency matrix of an undirected graph is always…', ['diagonal', 'symmetric', 'upper triangular', 'all ones'], 1, 'Edge u–v sets both A[u][v] and A[v][u].'],
    ['In the adjacency matrix of a digraph, the sum of row i gives…', ['in-degree of i', 'out-degree of i', 'number of edges', 'number of vertices'], 1, 'Row i lists edges leaving i (out-degree). Column i gives the in-degree.'],
    ['In an undirected graph with n vertices and e edges, the adjacency list has how many list nodes?', ['e', '2e', 'n', 'n + e'], 1, 'Each edge u–v appears twice: v in the list of u, and u in the list of v.'],
  ],
  traversal: [
    ['BFS uses which data structure?', ['Stack', 'Queue', 'Priority queue', 'Hash table'], 1, 'First in, first out — vertices are processed level by level.'],
    ['DFS (iterative) uses which data structure?', ['Queue', 'Stack', 'Heap', 'Deque only'], 1, 'Last in, first out. The recursive version uses the call stack.'],
    ['Time complexity of BFS/DFS with an adjacency list is…', ['O(n²)', 'O(n + e)', 'O(n log n)', 'O(e log n)'], 1, 'Each vertex is enqueued/visited once and each list is scanned once.'],
    ['Which traversal finds the path with the fewest edges in an unweighted graph?', ['DFS', 'BFS', 'In-order', 'Both always'], 1, 'BFS reaches vertices in order of distance (level).'],
    ['Why do we keep a visited[] array?', ['To sort the output', 'To avoid visiting a vertex twice and looping forever on a cycle', 'To store weights', 'It is only needed for trees'], 1, 'Graphs can have cycles. Without visited[] the traversal would loop.'],
    ['In DFS on an undirected graph, finding a back edge means…', ['the graph is a tree', 'the graph has a cycle', 'the graph is bipartite', 'the graph is disconnected'], 1, 'A back edge goes to an ancestor on the current path — that closes a cycle.'],
  ],
  algos: [
    ['A spanning tree of a connected graph with n vertices has…', ['n edges', 'n − 1 edges', 'n + 1 edges', 'n(n−1)/2 edges'], 1, 'Like every tree: n − 1 edges, no cycle, touches every vertex.'],
    ["Kruskal's algorithm rejects an edge when…", ['its weight is the largest', 'both ends are already in the same set (it would form a cycle)', 'it is a loop only', 'it is directed'], 1, 'Union-find tells us the two ends are already connected.'],
    ["Prim's algorithm grows…", ['a forest that merges', 'a single tree from a start vertex', 'shortest paths', 'a topological order'], 1, 'Prim always keeps one connected tree and adds the cheapest edge leaving it.'],
    ["Dijkstra's algorithm fails when…", ['the graph is directed', 'the graph has a negative edge weight', 'the graph is undirected', 'weights are equal'], 1, 'Once a vertex is fixed, Dijkstra never revisits it; a negative edge could make a shorter path later.'],
    ['A topological order exists if and only if the graph is…', ['connected', 'a DAG', 'complete', 'bipartite'], 1, 'Any directed cycle means some vertex must come before itself.'],
    ['With a binary heap, Dijkstra runs in…', ['O(n²)', 'O((n + e) log n)', 'O(n + e)', 'O(e²)'], 1, 'Each edge may cause a decrease-key, O(log n) each. The simple array version is O(n²).'],
  ],
  adv: [
    ['Bellman–Ford relaxes every edge how many times (at most) before the extra check?', ['1', 'log n', 'n − 1', 'e'], 2, 'A shortest path has at most n − 1 edges, so n − 1 passes are enough. Pass n is only the negative-cycle check.'],
    ['If Bellman–Ford can still improve a distance in pass n, the graph has…', ['a bridge', 'a negative cycle reachable from s', 'no path', 'an Euler circuit'], 1, 'Without a negative cycle every distance is final after n − 1 passes.'],
    ['Time complexity of Floyd–Warshall is…', ['O(n²)', 'O(n³)', 'O(n · e)', 'O(e log n)'], 1, 'Three nested loops over k, i and j.'],
    ['In Floyd–Warshall, which loop must be the outermost?', ['i (source)', 'j (destination)', 'k (middle vertex)', 'any order works'], 2, 'D^k is built from D^(k−1). All pairs must be updated for one k before moving to the next.'],
    ['DFS on a directed graph reaches a GREY vertex. This means…', ['a cross edge', 'the vertex is finished', 'a back edge, so a cycle', 'the graph is bipartite'], 2, 'Grey = still on the current path. Reaching it again closes a directed cycle.'],
    ['A graph is bipartite if and only if it has no…', ['even cycle', 'odd cycle', 'bridge', 'vertex of degree 1'], 1, 'Going round an odd cycle you cannot alternate two colours.'],
    ['Tree edge u → v (v child). u–v is a bridge when…', ['low[v] ≥ disc[u]', 'low[v] > disc[u]', 'disc[v] > low[u]', 'low[u] = low[v]'], 1, 'Strictly greater: nothing in the subtree of v reaches u or above. (≥ is the cut-vertex test.)'],
    ['A connected undirected graph has an Euler circuit if…', ['every vertex has even degree', 'exactly two vertices have odd degree', 'it is complete', 'it has a Hamiltonian cycle'], 0, 'Every time the walk passes through a vertex it uses two edges. Exactly 2 odd vertices gives an Euler path instead.'],
    ['Kosaraju\'s algorithm needs how many DFS passes?', ['1', '2', 'n', 'n − 1'], 1, 'Pass 1 on G for finish order, pass 2 on the reversed graph.'],
    ['The chromatic number of K₅ is…', ['2', '3', '4', '5'], 3, 'Every pair is joined, so all 5 vertices need different colours.'],
  ],
};

export function mountQuiz(el) {
  const qs = QUIZ[el.dataset.quiz];
  let score = 0, done = 0;
  el.innerHTML = `<p class="quiz-h"><b>Check yourself</b><span class="quiz-score" aria-live="polite">0 / ${qs.length}</span></p>` + qs.map((q, i) =>
    `<fieldset class="qq"><legend><span class="qn">${i + 1}.</span> ${q[0]}</legend><div class="opts">${q[1].map((o, j) => `<button type="button" class="opt" data-q="${i}" data-o="${j}"><span class="ol">${'ABCD'[j]}</span>${o}</button>`).join('')}</div><p class="why" hidden></p></fieldset>`).join('') +
    '<button type="button" class="quiz-reset">Try again</button>';
  el.querySelectorAll('.opt').forEach((bt) => {
    bt.onclick = () => {
      const q = +bt.dataset.q, o = +bt.dataset.o, fs = bt.closest('.qq');
      if (fs.dataset.done) return;
      fs.dataset.done = 1; done++;
      const ok = o === qs[q][2]; if (ok) score++;
      fs.querySelectorAll('.opt').forEach((x) => { x.disabled = true; if (+x.dataset.o === qs[q][2]) x.classList.add('right'); });
      if (!ok) bt.classList.add('wrong');
      const why = fs.querySelector('.why'); why.hidden = false;
      why.innerHTML = '<b>' + (ok ? 'Correct.' : 'Not quite. Answer: ' + 'ABCD'[qs[q][2]] + '.') + '</b> ' + qs[q][3];
      el.querySelector('.quiz-score').textContent = score + ' / ' + qs.length + (done === qs.length ? (score === qs.length ? ' · all correct' : ' · revise the ones in red') : '');
    };
  });
  el.querySelector('.quiz-reset').onclick = () => mountQuiz(el);
}
QUIZ.mixed = [QUIZ.basics[0], QUIZ.terms[5], QUIZ.types[2], QUIZ.repr[4], QUIZ.traversal[4], QUIZ.traversal[3], QUIZ.algos[1], QUIZ.algos[3], QUIZ.types[3], QUIZ.basics[2], QUIZ.adv[0], QUIZ.adv[5], QUIZ.adv[7]];
