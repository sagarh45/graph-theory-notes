# Unit V · Graphs — interactive notes

Simple-English notes for **Data Structures, Unit V (Graphs)**, with a visual for every idea.

## What is inside

| Part | Topics | Interactive |
|---|---|---|
| 1. Graph Basics | definition, G = (V, E), real-life uses, degree, handshake lemma | handshake lab |
| 2. Terminology | adjacent, incident, walk/trail/path/cycle, loops, components, bridge | term explorer |
| 3. Types of Graph | null, simple, multi, pseudo, directed, weighted, regular, complete, bipartite, strongly/weakly connected, DAG, tree, forest, isomorphic, planar | K<sub>n</sub> slider, type checker |
| 4. Representation | adjacency matrix, adjacency list, incidence matrix, edge list, comparison | representation lab (edit graph, all 4 forms update) |
| 5. Traversal | BFS with queue, DFS with stack/recursion, discovery/finish time, edge types, dry-run tables | step-by-step players, traversal lab |
| 6. MST & Shortest Path | Prim, Kruskal (union-find), Dijkstra, topological sort (Kahn) | step-by-step players, algorithm lab |
| 7. Revision & Exam | formula sheet, exam questions, mixed quiz | quiz |

Every graph editor accepts edges like `A-B` (undirected), `A>B` (directed), `A-B:4` (weight 4).

## C programs

`c/` has 8 tested C programs (adjacency matrix, adjacency list, BFS, DFS, Prim, Kruskal, Dijkstra, topological sort). Their real outputs are shown in the notes.

```bash
gcc -Wall c/03_bfs.c -o bfs && ./bfs
```

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

Built with Vite and plain JavaScript (no framework). Page content lives in `_parts/*.html`; `index.html` is these parts joined:
`cat _parts/*.html > index.html`.
