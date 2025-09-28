import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';

function GraphTheoryNotes()  {
  const [activeTab, setActiveTab] = useState('definitions');

  const tabs = [
    { id: 'definitions', label: 'Definitions' },
    { id: 'terminology', label: 'Terminology' },
    { id: 'types', label: 'Types of Graph' },
    { id: 'representation', label: 'Computer Representation' },
    { id: 'traversal', label: 'Graph Traversal' }
  ];

  const renderDefinitions = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">What is a Graph?</CardTitle>
          <CardDescription>Fundamental definition and mathematical representation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            A <strong>Graph</strong> is a non-linear data structure consisting of a collection of two finite sets (V and E) where V contains 
            the finite number of elements called vertices and E contains the finite number of elements called edges. An edge is defined as a pair of 
            vertices such that they are connected by a line segment.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-muted-foreground font-mono text-lg">G = (V, E)</p>
            <p className="text-sm text-muted-foreground mt-2">
              Where V is the set of vertices and E is the set of edges
            </p>
          </div>
          
          <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
            <h4 className="font-semibold text-accent-foreground mb-2">Practical Example with Visual:</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-mono text-base mb-2">Graph with 6 vertices and 9 edges:</p>
                <p className="font-mono text-base">V = {`{A, B, C, D, E, F}`}</p>
                <p className="font-mono text-base">E = {`{(A,B), (A,C), (B,C), (B,D), (C,E), (D,E), (D,F), (E,F), (B,D)}`}</p>
                <p className="text-base text-muted-foreground mt-2">Order of graph = 6 (number of vertices)</p>
                <div className="mt-3 p-2 bg-accent-50 rounded text-xs">
                  <p><strong>Structure Analysis:</strong></p>
                  <p>• A connects to B and C</p>
                  <p>• B connects to A, C, and D</p>
                  <p>• C connects to A, B, and E</p>
                  <p>• D connects to B, E, and F</p>
                  <p>• E connects to C, D, and F</p>
                  <p>• F connects to D and E</p>
                </div>
              </div>
              <div className="flex justify-center">
                <svg width="280" height="180" className="bg-white border rounded">
                  <circle cx="40" cy="60" r="18" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                  <text x="40" y="67" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">A</text>
                  
                  <circle cx="120" cy="30" r="18" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                  <text x="120" y="37" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">B</text>
                  
                  <circle cx="80" cy="130" r="18" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                  <text x="80" y="137" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">C</text>
                  
                  <circle cx="200" cy="30" r="18" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                  <text x="200" y="37" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">D</text>
                  
                  <circle cx="180" cy="130" r="18" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                  <text x="180" y="137" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">E</text>
                  
                  <circle cx="240" cy="100" r="18" fill="#ec4899" stroke="#db2777" strokeWidth="2"/>
                  <text x="240" y="107" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">F</text>
                  
                  <line x1="58" y1="60" x2="102" y2="30" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="58" y1="60" x2="62" y2="130" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="120" y1="48" x2="80" y2="112" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="138" y1="30" x2="182" y2="30" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="200" y1="48" x2="180" y2="112" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="200" y1="48" x2="222" y2="100" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="98" y1="130" x2="162" y2="130" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="218" y1="30" x2="240" y2="82" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="198" y1="130" x2="222" y2="100" stroke="#6b7280" strokeWidth="2"/>
                  
                  <text x="140" y="20" textAnchor="middle" fontSize="12" fill="#6b7280" fontWeight="bold">Figure 1: Example of Graph</text>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">Key Properties and Formulas:</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground text-base">
              <li>Graph consists of vertices (nodes) and edges (connections)</li>
              <li>Order of graph = number of vertices (n)</li>
              <li>Size of graph = number of edges (m)</li>
              <li>In a graph, the number of vertices of odd degree is always even</li>
              <li>Degree of a graph = twice the number of edges in a graph</li>
              <li>Complete graph with n vertices has n(n-1)/2 edges</li>
              <li>Used in routing algorithms, circuit problems, network analysis</li>
              <li>Applications in Physics, Chemistry, Mechanical, Electrical Engineering</li>
              <li>Graph can be finite or infinite depending on number of vertices</li>
              <li>Self-loops are allowed in some graph definitions</li>
              <li>Graphs are used in computer science, mathematics, and engineering</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Undirected Graphs</CardTitle>
          <CardDescription>Bidirectional edges with symmetric relationships</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            An <strong>undirected graph</strong> is a graph where the set E is a collection of unordered pairs of vertices. 
            In an undirected graph, we can move in either direction between two vertices along the edge. 
            The edge (u, v) is identical to edge (v, u).
          </p>
          
          <div className="bg-accent/20 p-4 rounded-lg">
            <h4 className="font-semibold text-accent-foreground mb-2">Characteristics of Undirected Graphs:</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li>Edges are bidirectional (no arrows) - can traverse in both directions</li>
              <li>Represented as unordered pairs: {`{u, v}`} where {`{u,v} = {v,u}`}</li>
              <li>Edge (A,B) = Edge (B,A) - symmetric relationship</li>
              <li>Adjacency matrix is symmetric (M[i][j] = M[j][i])</li>
              <li>Degree of vertex = number of edges incident to it</li>
              <li>Sum of all degrees = 2 × number of edges (Handshaking Lemma)</li>
              <li>No distinction between incoming and outgoing edges</li>
              <li>Used to model mutual relationships (friendship, collaboration)</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-4">Visual Example - Undirected Graph:</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold mb-2">Social Network (Friendship):</p>
                <div className="flex justify-center">
                  <svg width="160" height="120" className="bg-white border rounded">
                    <circle cx="40" cy="30" r="18" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                    <text x="40" y="36" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Alice</text>
                    
                    <circle cx="120" cy="30" r="18" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                    <text x="120" y="36" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Bob</text>
                    
                    <circle cx="40" cy="90" r="18" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                    <text x="40" y="96" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Carol</text>
                    
                    <circle cx="120" cy="90" r="18" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                    <text x="120" y="96" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Dave</text>
                    
                    <line x1="58" y1="30" x2="102" y2="30" stroke="#6b7280" strokeWidth="2"/>
                    <line x1="58" y1="90" x2="102" y2="90" stroke="#6b7280" strokeWidth="2"/>
                    <line x1="40" y1="48" x2="40" y2="72" stroke="#6b7280" strokeWidth="2"/>
                    <line x1="120" y1="48" x2="120" y2="72" stroke="#6b7280" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-mono text-base mb-2">Friendship connections (mutual):</p>
                <p className="font-mono text-base">V = {`{Alice, Bob, Carol, Dave}`}</p>
                <p className="font-mono text-base">E = {`{{Alice,Bob}, {Bob,Dave}, {Carol,Dave}, {Alice,Carol}}`}</p>
                <p className="text-base text-muted-foreground mt-2">
                  If Alice is friends with Bob, then Bob is also friends with Alice
                </p>
                <div className="mt-3 text-xs bg-blue-50 p-2 rounded">
                  <p><strong>Bidirectional:</strong> Edge {`{Alice,Bob}`} = Edge {`{Bob,Alice}`}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Directed Graphs (Digraphs)</CardTitle>
          <CardDescription>Unidirectional edges with asymmetric relationships</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            A <strong>directed graph</strong> is a graph where the set E of edges is a collection of ordered pairs of vertices. 
            In a directed graph, each edge is marked with a direction towards the second vertex from the first vertex of the ordered pair. 
            We can move only in one direction of the edge.
          </p>
          
          <div className="bg-accent/20 p-4 rounded-lg">
            <h4 className="font-semibold text-accent-foreground mb-2">Characteristics of Directed Graphs:</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li>Edges are unidirectional (have arrows indicating direction)</li>
              <li>Represented as ordered pairs: (u, v) where u is source, v is destination</li>
              <li>Edge (A,B) ≠ Edge (B,A) - asymmetric relationship</li>
              <li>In-degree: number of arcs entering the vertex (InDeg(u))</li>
              <li>Out-degree: number of arcs leaving the vertex (OutDeg(u))</li>
              <li>Source vertex: positive out-degree, zero in-degree (OutDeg `{'>'}` 0, InDeg = 0)</li>
              <li>Sink vertex: positive in-degree, zero out-degree (InDeg `{'>'}` 0, OutDeg = 0)</li>
              <li>Adjacency matrix is generally not symmetric</li>
              <li>Often called digraph (directed graph)</li>
              <li>Used to model one-way relationships (web links, task dependencies)</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-4">Visual Example - Directed Graph:</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold mb-2">Web Pages (Hyperlinks):</p>
                <div className="flex justify-center">
                  <svg width="180" height="140" className="bg-white border rounded">
                    <circle cx="45" cy="35" r="20" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                    <text x="45" y="40" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">P1</text>
                    
                    <circle cx="135" cy="35" r="20" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                    <text x="135" y="40" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">P2</text>
                    
                    <circle cx="45" cy="105" r="20" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                    <text x="45" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">P3</text>
                    
                    <circle cx="135" cy="105" r="20" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                    <text x="135" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">P4</text>
                    
                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280"/>
                      </marker>
                    </defs>
                    
                    <line x1="65" y1="35" x2="115" y2="35" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)"/>
                    <line x1="135" y1="55" x2="135" y2="85" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)"/>
                    <line x1="115" y1="105" x2="65" y2="105" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)"/>
                    <line x1="45" y1="85" x2="45" y2="55" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)"/>
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-mono text-base mb-2">Hyperlink connections (one-way):</p>
                <p className="font-mono text-base">V = {`{Page1, Page2, Page3, Page4}`}</p>
                <p className="font-mono text-base">E = {`{(P1,P2), (P2,P4), (P4,P3), (P3,P1)}`}</p>
                <p className="text-base text-muted-foreground mt-2">
                  Page1 links to Page2, but Page2 doesn't necessarily link back to Page1
                </p>
                <div className="mt-3 text-xs bg-red-50 p-2 rounded">
                  <p><strong>Unidirectional:</strong> Edge (P1,P2) ≠ Edge (P2,P1)</p>
                  <p><strong>Arrows show direction</strong> of the edges</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTerminology = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Fundamental Terminology</CardTitle>
          <CardDescription>Essential graph theory terms with detailed explanations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">1. Adjacent Vertices</h4>
              <p className="text-base text-muted-foreground mb-2">Two vertices are said to be adjacent if they are connected by an edge.</p>
              <div className="bg-blue-100 p-3 rounded text-sm">
                <p><strong>Example:</strong> B and C are adjacent to vertex A because separate edges connect B and C to A.</p>
                <div className="flex justify-center my-3">
                  <svg width="180" height="120" className="bg-white border rounded">
                    <circle cx="90" cy="30" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                    <text x="90" y="36" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">A</text>
                    
                    <circle cx="30" cy="90" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                    <text x="30" y="96" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">B</text>
                    
                    <circle cx="150" cy="90" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                    <text x="150" y="96" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">C</text>
                    
                    <line x1="80" y1="40" x2="40" y2="80" stroke="#8b5cf6" strokeWidth="2"/>
                    <line x1="100" y1="40" x2="140" y2="80" stroke="#8b5cf6" strokeWidth="2"/>
                    
                    <text x="90" y="15" textAnchor="middle" fontSize="8" fill="#8b5cf6" fontWeight="bold">B and C are adjacent to A</text>
                  </svg>
                </div>
                <p><strong>Key Points:</strong></p>
                <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                  <li>Adjacent = Direct connection by an edge</li>
                  <li>B is adjacent to A (connected by edge)</li>
                  <li>C is adjacent to A (connected by edge)</li>
                  <li>B and C are NOT adjacent to each other (no direct edge)</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">2. Adjacent Edges</h4>
              <p className="text-base text-muted-foreground mb-2">Two edges are said to be adjacent if they are incident on the common vertex.</p>
              <div className="bg-green-100 p-3 rounded text-sm">
                <p><strong>Example:</strong> Edges CD and CE are adjacent because they are incident on the common vertex C.</p>
                <div className="flex justify-center my-3">
                  <svg width="160" height="120" className="bg-white border rounded">
                    <circle cx="80" cy="40" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                    <text x="80" y="46" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">C</text>
                    
                    <circle cx="30" cy="90" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                    <text x="30" y="96" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">D</text>
                    
                    <circle cx="130" cy="90" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                    <text x="130" y="96" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">E</text>
                    
                    <line x1="70" y1="50" x2="40" y2="80" stroke="#dc2626" strokeWidth="3"/>
                    <line x1="90" y1="50" x2="120" y2="80" stroke="#dc2626" strokeWidth="3"/>
                    
                    <text x="50" y="75" fontSize="8" fill="#dc2626" fontWeight="bold">CD</text>
                    <text x="110" y="75" fontSize="8" fill="#dc2626" fontWeight="bold">CE</text>
                    <text x="80" y="15" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">CD and CE are adjacent edges</text>
                  </svg>
                </div>
                <p><strong>Key Points:</strong></p>
                <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                  <li>Adjacent edges share a common vertex</li>
                  <li>Edge CD and Edge CE both meet at vertex C</li>
                  <li>C is the common vertex for both edges</li>
                  <li>Like two roads meeting at same intersection</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-3">3. Path</h4>
              <p className="text-base text-muted-foreground mb-2">A path is a sequence of distinct vertices in which each vertex is adjacent to the next one.</p>
              <div className="bg-purple-100 p-3 rounded text-sm">
                <p><strong>Example:</strong> There is a path ABCDF from A to F. The path is said to be simple if all the nodes are distinct.</p>
                <div className="flex justify-center my-3">
                  <svg width="280" height="120" className="bg-white border rounded">
                    <circle cx="40" cy="60" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                    <text x="40" y="66" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">A</text>
                    
                    <circle cx="100" cy="30" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                    <text x="100" y="36" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">B</text>
                    
                    <circle cx="100" cy="90" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                    <text x="100" y="96" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">C</text>
                    
                    <circle cx="180" cy="60" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                    <text x="180" y="66" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">D</text>
                    
                    <circle cx="240" cy="60" r="15" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                    <text x="240" y="66" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">F</text>
                    
                    {/* Path ABCDF highlighted */}
                    <line x1="55" y1="55" x2="85" y2="35" stroke="#dc2626" strokeWidth="4"/>
                    <line x1="100" y1="45" x2="100" y2="75" stroke="#dc2626" strokeWidth="4"/>
                    <line x1="115" y1="85" x2="165" y2="65" stroke="#dc2626" strokeWidth="4"/>
                    <line x1="195" y1="60" x2="225" y2="60" stroke="#dc2626" strokeWidth="4"/>
                    
                    <text x="140" y="15" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">Path: A → B → C → D → F</text>
                    <text x="140" y="110" textAnchor="middle" fontSize="9" fill="#6b7280">Length = 4 edges, All vertices distinct</text>
                  </svg>
                </div>
                <p><strong>Key Points:</strong></p>
                <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                  <li>Path = Sequence of connected vertices</li>
                  <li>A → B → C → D → F (each step is adjacent)</li>
                  <li>Simple path: All vertices are distinct (no repetition)</li>
                  <li>Path length = Number of edges = 4</li>
                  <li>Like directions from one place to another</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-3">4. Cycle</h4>
              <p className="text-base text-muted-foreground mb-2">A cycle is a path consisting of at least three vertices where last vertex is adjacent to the first vertex.</p>
              <div className="bg-yellow-100 p-3 rounded text-sm">
                <p><strong>Example:</strong> The cycle CDFEC starts at C and returns to C.</p>
                <div className="flex justify-center my-3">
                  <svg width="200" height="140" className="bg-white border rounded">
                    <circle cx="100" cy="30" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                    <text x="100" y="36" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">C</text>
                    
                    <circle cx="160" cy="70" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                    <text x="160" y="76" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">D</text>
                    
                    <circle cx="130" cy="110" r="15" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                    <text x="130" y="116" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">F</text>
                    
                    <circle cx="70" cy="110" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                    <text x="70" y="116" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">E</text>
                    
                    <circle cx="40" cy="70" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                    <text x="40" y="76" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">X</text>
                    
                    {/* Cycle CDFEC highlighted */}
                    <line x1="110" y1="40" x2="150" y2="60" stroke="#f97316" strokeWidth="4"/>
                    <line x1="150" y1="80" x2="140" y2="95" stroke="#f97316" strokeWidth="4"/>
                    <line x1="115" y1="110" x2="85" y2="110" stroke="#f97316" strokeWidth="4"/>
                    <line x1="70" y1="95" x2="55" y2="80" stroke="#f97316" strokeWidth="4"/>
                    <line x1="55" y1="70" x2="85" y2="40" stroke="#f97316" strokeWidth="4"/>
                    
                    {/* Arrow indicators for direction */}
                    <polygon points="115,35 120,40 115,45" fill="#f97316"/>
                    <polygon points="145,85 140,90 135,85" fill="#f97316"/>
                    <polygon points="85,115 80,110 85,105" fill="#f97316"/>
                    <polygon points="65,85 60,80 65,75" fill="#f97316"/>
                    <polygon points="75,45 80,40 85,45" fill="#f97316"/>
                    
                    <text x="100" y="15" textAnchor="middle" fontSize="9" fill="#f97316" fontWeight="bold">Cycle: C → D → F → E → X → C</text>
                    <text x="100" y="135" textAnchor="middle" fontSize="8" fill="#6b7280">Starts and ends at same vertex C</text>
                  </svg>
                </div>
                <p><strong>Key Points:</strong></p>
                <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                  <li>Cycle = Closed path that returns to starting point</li>
                  <li>C → D → F → E → X → C (back to C)</li>
                  <li>Must have at least 3 vertices</li>
                  <li>Like a circular route that brings you home</li>
                  <li>First and last vertices are the same</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-3">5. Loop (Self-edge)</h4>
              <p className="text-base text-muted-foreground mb-2">It is a special cycle that starts and ends with the same vertex without visiting any other vertex.</p>
              <div className="bg-red-100 p-3 rounded text-sm">
                <p><strong>Example:</strong> If the edge starts and ends at vertex C without visiting any other vertex then this is called a loop.</p>
                <div className="flex justify-center my-3">
                  <svg width="120" height="100" className="bg-white border rounded">
                    <circle cx="60" cy="60" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                    <text x="60" y="66" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">C</text>
                    
                    {/* Loop at C */}
                    <circle cx="60" cy="30" r="12" fill="none" stroke="#dc2626" strokeWidth="3"/>
                    <polygon points="72,30 68,25 68,35" fill="#dc2626"/>
                    
                    <text x="60" y="15" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="bold">Loop at vertex C</text>
                    <text x="60" y="90" textAnchor="middle" fontSize="8" fill="#6b7280">Edge starts and ends at C</text>
                  </svg>
                </div>
                <p><strong>Key Points:</strong></p>
                <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                  <li>Loop = Edge that connects vertex to itself</li>
                  <li>Starts at C and ends at C</li>
                  <li>No other vertex involved</li>
                  <li>Contributes 2 to the degree of vertex</li>
                  <li>Like a person being friends with themselves</li>
                </ul>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-800 mb-3">6. Degree of a Vertex</h4>
              <p className="text-base text-muted-foreground mb-2">The degree of a vertex is the number of lines incident on it. The loop contributes two to the degree of the vertex.</p>
              <div className="bg-indigo-100 p-3 rounded text-sm">
                <p><strong>Example:</strong> The degree of D is four and degree of C will be six if there is a loop on C.</p>
                <div className="flex justify-center my-3">
                  <svg width="200" height="140" className="bg-white border rounded">
                    <circle cx="100" cy="40" r="18" fill="#ef4444" stroke="#dc2626" strokeWidth="3"/>
                    <text x="100" y="46" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">D</text>
                    
                    <circle cx="40" cy="100" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                    <text x="40" y="106" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">A</text>
                    
                    <circle cx="100" cy="100" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                    <text x="100" y="106" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">B</text>
                    
                    <circle cx="160" cy="100" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                    <text x="160" y="106" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">E</text>
                    
                    <circle cx="130" cy="70" r="15" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                    <text x="130" y="76" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">F</text>
                    
                    {/* Four edges connected to D */}
                    <line x1="88" y1="52" x2="52" y2="88" stroke="#f59e0b" strokeWidth="2"/>
                    <line x1="100" y1="58" x2="100" y2="85" stroke="#f59e0b" strokeWidth="2"/>
                    <line x1="112" y1="52" x2="148" y2="88" stroke="#f59e0b" strokeWidth="2"/>
                    <line x1="115" y1="45" x2="115" y2="65" stroke="#f59e0b" strokeWidth="2"/>
                    
                    <text x="100" y="25" textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="bold">Degree of D = 4</text>
                    <text x="100" y="130" textAnchor="middle" fontSize="8" fill="#6b7280">4 edges incident on D</text>
                  </svg>
                </div>
                <p><strong>Key Points:</strong></p>
                <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                  <li>Degree = Number of edges connected to vertex</li>
                  <li>D has 4 edges → Degree = 4</li>
                  <li>Loop contributes 2 to degree (both ends at same vertex)</li>
                  <li>If C has loop + 4 other edges → Degree = 6</li>
                  <li><strong>Important:</strong> Σ(all degrees) = 2 × total edges</li>
                  <li>Number of odd-degree vertices is always even</li>
                </ul>
              </div>
            </div>

            <div className="bg-pink-50 p-4 rounded-lg">
              <h4 className="font-semibold text-pink-800 mb-3">7. Connected Vertices</h4>
              <p className="text-sm text-muted-foreground mb-2">Two vertices are said to be connected if there is a path between them.</p>
              <div className="bg-pink-100 p-3 rounded text-sm">
                <p><strong>Example:</strong> A and F are connected because there is a path between A and F.</p>
                <div className="flex justify-center my-3">
                  <svg width="280" height="120" className="bg-white border rounded">
                    <circle cx="40" cy="60" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                    <text x="40" y="66" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">A</text>
                    
                    <circle cx="100" cy="30" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                    <text x="100" y="36" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">B</text>
                    
                    <circle cx="100" cy="90" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                    <text x="100" y="96" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">C</text>
                    
                    <circle cx="180" cy="60" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                    <text x="180" y="66" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">D</text>
                    
                    <circle cx="240" cy="60" r="15" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                    <text x="240" y="66" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">F</text>
                    
                    {/* Path from A to F */}
                    <line x1="55" y1="55" x2="85" y2="35" stroke="#dc2626" strokeWidth="3"/>
                    <line x1="100" y1="45" x2="100" y2="75" stroke="#dc2626" strokeWidth="3"/>
                    <line x1="115" y1="85" x2="165" y2="65" stroke="#dc2626" strokeWidth="3"/>
                    <line x1="195" y1="60" x2="225" y2="60" stroke="#dc2626" strokeWidth="3"/>
                    
                    <text x="140" y="15" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">A and F are connected</text>
                    <text x="140" y="110" textAnchor="middle" fontSize="9" fill="#6b7280">Path exists: A → B → C → D → F</text>
                  </svg>
                </div>
                <p><strong>Key Points:</strong></p>
                <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                  <li>Connected = Path exists between two vertices</li>
                  <li>A and F are connected via path A→B→C→D→F</li>
                  <li>May not be directly adjacent, but reachable</li>
                  <li>Like two cities connected by roads (may need multiple stops)</li>
                  <li>If no path exists, vertices are disconnected</li>
                </ul>
              </div>
            </div>

            <div className="bg-cyan-50 p-4 rounded-lg">
              <h4 className="font-semibold text-cyan-800 mb-3">8. Out-degree (Directed Graphs)</h4>
              <p className="text-sm text-muted-foreground mb-2">The out-degree of a directed graph is the number of arcs leaving the vertex. OutDeg(u) is the number of edges that start at u.</p>
              <div className="bg-cyan-100 p-3 rounded text-sm">
                <p><strong>Example:</strong> u is called the source if it has positive OutDeg but zero in-degree.</p>
                <div className="flex justify-center my-3">
                  <svg width="180" height="120" className="bg-white border rounded">
                    <circle cx="90" cy="60" r="18" fill="#ef4444" stroke="#dc2626" strokeWidth="3"/>
                    <text x="90" y="66" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">u</text>
                    
                    <circle cx="30" cy="30" r="12" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                    <text x="30" y="36" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">A</text>
                    
                    <circle cx="150" cy="30" r="12" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                    <text x="150" y="36" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">B</text>
                    
                    <circle cx="150" cy="90" r="12" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                    <text x="150" y="96" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">C</text>
                    
                    {/* Directed edges leaving u */}
                    <defs>
                      <marker id="arrow-out" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#dc2626"/>
                      </marker>
                    </defs>
                    
                    <line x1="78" y1="50" x2="42" y2="40" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrow-out)"/>
                    <line x1="102" y1="50" x2="138" y2="40" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrow-out)"/>
                    <line x1="102" y1="70" x2="138" y2="80" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrow-out)"/>
                    
                    <text x="90" y="15" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="bold">OutDeg(u) = 3</text>
                    <text x="90" y="110" textAnchor="middle" fontSize="8" fill="#6b7280">3 edges leaving vertex u</text>
                  </svg>
                </div>
                <p><strong>Key Points:</strong></p>
                <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                  <li>Out-degree = Number of arrows going OUT from vertex</li>
                  <li>u has 3 outgoing edges → OutDeg(u) = 3</li>
                  <li>Source vertex: OutDeg `{'>'}` 0, InDeg = 0</li>
                  <li>Like a person who calls others but receives no calls</li>
                  <li>Important in directed graphs and networks</li>
                </ul>
              </div>
            </div>

            <div className="bg-teal-50 p-4 rounded-lg">
              <h4 className="font-semibold text-teal-800 mb-3">9. In-degree (Directed Graphs)</h4>
              <p className="text-sm text-muted-foreground mb-2">The in-degree of a directed graph is the number of arcs entering the vertex. InDeg(u) is the number of edges that terminate at u.</p>
              <div className="bg-teal-100 p-3 rounded text-sm">
                <p><strong>Example:</strong> u is called the sink if it has positive InDeg but zero out-degree.</p>
                <div className="flex justify-center my-3">
                  <svg width="180" height="120" className="bg-white border rounded">
                    <circle cx="90" cy="60" r="18" fill="#ef4444" stroke="#dc2626" strokeWidth="3"/>
                    <text x="90" y="66" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">u</text>
                    
                    <circle cx="30" cy="30" r="12" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                    <text x="30" y="36" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">A</text>
                    
                    <circle cx="150" cy="30" r="12" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                    <text x="150" y="36" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">B</text>
                    
                    <circle cx="30" cy="90" r="12" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                    <text x="30" y="96" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">C</text>
                    
                    {/* Directed edges entering u */}
                    <defs>
                      <marker id="arrow-in" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#0891b2"/>
                      </marker>
                    </defs>
                    
                    <line x1="42" y1="40" x2="78" y2="50" stroke="#0891b2" strokeWidth="2" markerEnd="url(#arrow-in)"/>
                    <line x1="138" y1="40" x2="102" y2="50" stroke="#0891b2" strokeWidth="2" markerEnd="url(#arrow-in)"/>
                    <line x1="42" y1="80" x2="78" y2="70" stroke="#0891b2" strokeWidth="2" markerEnd="url(#arrow-in)"/>
                    
                    <text x="90" y="15" textAnchor="middle" fontSize="9" fill="#0891b2" fontWeight="bold">InDeg(u) = 3</text>
                    <text x="90" y="110" textAnchor="middle" fontSize="8" fill="#6b7280">3 edges entering vertex u</text>
                  </svg>
                </div>
                <p><strong>Key Points:</strong></p>
                <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                  <li>In-degree = Number of arrows coming INTO vertex</li>
                  <li>u has 3 incoming edges → InDeg(u) = 3</li>
                  <li>Sink vertex: InDeg `{'>'}` 0, OutDeg = 0</li>
                  <li>Like a popular person who receives many calls but makes none</li>
                  <li>Important for analyzing data flow and dependencies</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-3">10. Multiple Edges</h4>
              <p className="text-sm text-muted-foreground mb-2">The distinct parallel edges that connect the same end points.</p>
              <div className="bg-orange-100 p-3 rounded text-sm">
                <p><strong>Example:</strong> Multiple edges between the same pair of vertices, like multiple roads between two cities.</p>
                <div className="flex justify-center my-3">
                  <svg width="140" height="100" className="bg-white border rounded">
                    <circle cx="30" cy="50" r="18" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                    <text x="30" y="56" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                    
                    <circle cx="110" cy="50" r="18" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                    <text x="110" y="56" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                    
                    {/* Multiple parallel edges */}
                    <path d="M 48 45 Q 70 25 92 45" stroke="#dc2626" strokeWidth="2" fill="none"/>
                    <line x1="48" y1="50" x2="92" y2="50" stroke="#dc2626" strokeWidth="2"/>
                    <path d="M 48 55 Q 70 75 92 55" stroke="#dc2626" strokeWidth="2" fill="none"/>
                    
                    <text x="70" y="15" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="bold">3 Multiple Edges</text>
                    <text x="70" y="90" textAnchor="middle" fontSize="8" fill="#6b7280">Same endpoints A and B</text>
                  </svg>
                </div>
                <p><strong>Key Points:</strong></p>
                <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                  <li>Multiple edges = Several connections between same two vertices</li>
                  <li>All edges connect A and B (same endpoints)</li>
                  <li>Like multiple lanes on a highway</li>
                  <li>Each edge is distinct despite same endpoints</li>
                  <li>Common in multigraphs and network modeling</li>
                  <li>Represents multiple relationships or capacities</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRepresentation = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Graph Representations (From PDF)</CardTitle>
          <CardDescription>Different ways to represent graphs in computer memory</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Graphs can be represented in computer memory using various data structures. The choice depends on the operations needed and space constraints.
          </p>
          
          <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
            <h4 className="font-semibold text-accent-foreground mb-2">Graph Representation Methods:</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold">1. Adjacency Matrix</p>
                <p className="text-xs">2D array representation</p>
                <p className="text-xs">Space: O(V²)</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold">2. Adjacency List</p>
                <p className="text-xs">Array of linked lists</p>
                <p className="text-xs">Space: O(V + E)</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="font-semibold">3. Incidence Matrix</p>
                <p className="text-xs">Vertex-Edge matrix</p>
                <p className="text-xs">Space: O(V × E)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Adjacency Matrix Representation</CardTitle>
          <CardDescription>2D array where A[i][j] = 1 if edge exists from vertex i to j</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">Theory and Rules:</h4>
            <div className="text-sm space-y-2">
              <p><strong>Definition:</strong> An adjacency matrix is a square matrix used to represent a finite graph.</p>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold mb-2">Rules for Adjacency Matrix:</p>
                <ul className="list-disc list-inside text-xs space-y-1">
                  <li><strong>Matrix Size:</strong> n × n where n is the number of vertices</li>
                  <li><strong>For Undirected Graph:</strong> A[i][j] = A[j][i] = 1 if edge exists between vertices i and j</li>
                  <li><strong>For Directed Graph:</strong> A[i][j] = 1 if directed edge exists from vertex i to j</li>
                  <li><strong>Self-loops:</strong> A[i][i] = 1 if there is a loop at vertex i</li>
                  <li><strong>No Edge:</strong> A[i][j] = 0 if no edge exists</li>
                  <li><strong>Weighted Graph:</strong> A[i][j] = weight of edge instead of 1</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-4">Visual Example - Undirected Graph:</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold mb-3">Graph Structure:</p>
                <svg width="200" height="150" className="bg-white border rounded">
                  <circle cx="50" cy="40" r="20" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                  <text x="50" y="48" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">A</text>
                  
                  <circle cx="150" cy="40" r="20" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                  <text x="150" y="48" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">B</text>
                  
                  <circle cx="50" cy="110" r="20" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                  <text x="50" y="118" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">C</text>
                  
                  <circle cx="150" cy="110" r="20" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                  <text x="150" y="118" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">D</text>
                  
                  <line x1="70" y1="40" x2="130" y2="40" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="50" y1="60" x2="50" y2="90" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="150" y1="60" x2="150" y2="90" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="70" y1="110" x2="130" y2="110" stroke="#6b7280" strokeWidth="2"/>
                </svg>
                <p className="text-xs text-muted-foreground mt-2">Edges: A-B, A-C, B-D, C-D</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold mb-3">Adjacency Matrix:</p>
                <div className="bg-white border rounded p-3">
                  <table className="text-xs font-mono">
                    <thead>
                      <tr>
                        <th className="p-1 border border-border"></th>
                        <th className="p-1 border border-border bg-blue-100">A</th>
                        <th className="p-1 border border-border bg-green-100">B</th>
                        <th className="p-1 border border-border bg-yellow-100">C</th>
                        <th className="p-1 border border-border bg-red-100">D</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1 border border-border bg-blue-100 font-bold">A</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center">0</td>
                      </tr>
                      <tr>
                        <td className="p-1 border border-border bg-green-100 font-bold">B</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                      </tr>
                      <tr>
                        <td className="p-1 border border-border bg-yellow-100 font-bold">C</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                      </tr>
                      <tr>
                        <td className="p-1 border border-border bg-red-100 font-bold">D</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center">0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Green cells = Edge exists (1)</p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">Directed Graph Matrix Example:</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold mb-3">Directed Graph:</p>
                <svg width="180" height="140" className="bg-white border rounded">
                  <circle cx="45" cy="35" r="18" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                  <text x="45" y="42" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">0</text>
                  
                  <circle cx="135" cy="35" r="18" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                  <text x="135" y="42" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
                  
                  <circle cx="45" cy="105" r="18" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                  <text x="45" y="112" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
                  
                  <circle cx="135" cy="105" r="18" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                  <text x="135" y="112" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
                  
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280"/>
                    </marker>
                  </defs>
                  
                  <line x1="63" y1="35" x2="117" y2="35" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <line x1="135" y1="53" x2="135" y2="87" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <line x1="117" y1="105" x2="63" y2="105" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                </svg>
                <p className="text-xs text-muted-foreground mt-2">Edges: 0→1, 1→3, 3→2</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold mb-3">Directed Matrix:</p>
                <div className="bg-white border rounded p-3">
                  <table className="text-xs font-mono">
                    <thead>
                      <tr>
                        <th className="p-1 border border-border"></th>
                        <th className="p-1 border border-border bg-blue-100">0</th>
                        <th className="p-1 border border-border bg-green-100">1</th>
                        <th className="p-1 border border-border bg-yellow-100">2</th>
                        <th className="p-1 border border-border bg-red-100">3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1 border border-border bg-blue-100 font-bold">0</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center">0</td>
                      </tr>
                      <tr>
                        <td className="p-1 border border-border bg-green-100 font-bold">1</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                      </tr>
                      <tr>
                        <td className="p-1 border border-border bg-yellow-100 font-bold">2</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center">0</td>
                      </tr>
                      <tr>
                        <td className="p-1 border border-border bg-red-100 font-bold">3</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center">0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Not symmetric for directed graphs</p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">Complete Adjacency Matrix Implementation:</h4>
            <pre className="text-sm font-mono bg-background p-3 rounded border overflow-x-auto">
{`// Adjacency Matrix Complete Implementation
#include<stdio.h>
#include<conio.h>
#define MAX 20

int adj[MAX][MAX], n, edges;

void createGraph() {
    int i, j, u, v;
    
    printf("Enter number of vertices: ");
    scanf("%d", &n);
    
    // Initialize matrix
    for(i = 0; i < n; i++) {
        for(j = 0; j < n; j++) {
            adj[i][j] = 0;
        }
    }
    
    printf("Enter number of edges: ");
    scanf("%d", &edges);
    
    printf("Enter edges (u v):\\n");
    for(i = 0; i < edges; i++) {
        scanf("%d %d", &u, &v);
        adj[u][v] = 1;
        adj[v][u] = 1; // For undirected graph
    }
}

void displayMatrix() {
    int i, j;
    printf("\\nAdjacency Matrix:\\n   ");
    
    // Print column headers
    for(i = 0; i < n; i++) {
        printf("%d ", i);
    }
    printf("\\n");
    
    // Print matrix with row headers
    for(i = 0; i < n; i++) {
        printf("%d: ", i);
        for(j = 0; j < n; j++) {
            printf("%d ", adj[i][j]);
        }
        printf("\\n");
    }
}

void checkEdge() {
    int u, v;
    printf("\\nEnter vertices to check edge (u v): ");
    scanf("%d %d", &u, &v);
    
    if(adj[u][v] == 1) {
        printf("Edge exists between %d and %d\\n", u, v);
    } else {
        printf("No edge between %d and %d\\n", u, v);
    }
}

int main() {
    createGraph();
    displayMatrix();
    checkEdge();
    return 0;
}`}
            </pre>
          </div>

          <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
            <h4 className="font-semibold text-accent-foreground mb-2">Sample Input/Output Visualization:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-sm mb-2">Sample Input:</p>
                <pre className="text-xs font-mono">
{`Enter number of vertices: 4
Enter number of edges: 4
Enter edges (u v):
0 1
0 2
1 3
2 3`}
                </pre>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-sm mb-2">Sample Output:</p>
                <pre className="text-xs font-mono">
{`Adjacency Matrix:
   0 1 2 3
0: 0 1 1 0
1: 1 0 0 1
2: 1 0 0 1
3: 0 1 1 0

Enter vertices to check edge (u v): 0 1
Edge exists between 0 and 1`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="bg-accent/20 p-4 rounded-lg">
            <h4 className="font-semibold text-accent-foreground mb-2">Properties and Characteristics:</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li><strong>Space Complexity:</strong> O(V²) - uses V×V matrix regardless of edge count</li>
              <li><strong>Edge Check:</strong> O(1) - direct array access</li>
              <li><strong>Add/Remove Edge:</strong> O(1) - single matrix update</li>
              <li><strong>Memory Inefficient</strong> for sparse graphs (few edges)</li>
              <li><strong>Memory Efficient</strong> for dense graphs (many edges)</li>
              <li><strong>Symmetric Matrix:</strong> For undirected graphs A[i][j] = A[j][i]</li>
              <li><strong>Self-loops:</strong> Diagonal elements A[i][i] = 1</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Adjacency List Representation</CardTitle>
          <CardDescription>Array of lists representation - memory efficient for sparse graphs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">Theory and Rules:</h4>
            <div className="text-sm space-y-2">
              <p><strong>Definition:</strong> Each vertex maintains a list of its adjacent vertices using linked lists or arrays.</p>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold mb-2">Rules for Adjacency List:</p>
                <ul className="list-disc list-inside text-xs space-y-1">
                  <li><strong>Array Size:</strong> n arrays where n is the number of vertices</li>
                  <li><strong>For Undirected Graph:</strong> If edge (u,v) exists, add v to list[u] and u to list[v]</li>
                  <li><strong>For Directed Graph:</strong> If edge (u,v) exists, add v to list[u] only</li>
                  <li><strong>Self-loops:</strong> Add vertex to its own adjacency list</li>
                  <li><strong>Implementation:</strong> Arrays of linked lists or vectors</li>
                  <li><strong>Space Efficient:</strong> Only stores existing edges, ideal for sparse graphs</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-4">Visual Adjacency List Representation:</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold mb-3">Same Graph Structure:</p>
                <svg width="200" height="150" className="bg-white border rounded">
                  <circle cx="50" cy="40" r="20" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                  <text x="50" y="48" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">A</text>
                  
                  <circle cx="150" cy="40" r="20" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                  <text x="150" y="48" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">B</text>
                  
                  <circle cx="50" cy="110" r="20" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                  <text x="50" y="118" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">C</text>
                  
                  <circle cx="150" cy="110" r="20" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                  <text x="150" y="118" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">D</text>
                  
                  <line x1="70" y1="40" x2="130" y2="40" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="50" y1="60" x2="50" y2="90" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="150" y1="60" x2="150" y2="90" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="70" y1="110" x2="130" y2="110" stroke="#6b7280" strokeWidth="2"/>
                </svg>
              </div>
              
              <div>
                <p className="text-sm font-semibold mb-3">Adjacency List:</p>
                <div className="bg-white border rounded p-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">A</div>
                    <span className="text-sm">→</span>
                    <div className="flex space-x-1">
                      <div className="px-2 py-1 bg-green-200 rounded text-xs">B</div>
                      <div className="px-2 py-1 bg-yellow-200 rounded text-xs">C</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">B</div>
                    <span className="text-sm">→</span>
                    <div className="flex space-x-1">
                      <div className="px-2 py-1 bg-blue-200 rounded text-xs">A</div>
                      <div className="px-2 py-1 bg-red-200 rounded text-xs">D</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">C</div>
                    <span className="text-sm">→</span>
                    <div className="flex space-x-1">
                      <div className="px-2 py-1 bg-blue-200 rounded text-xs">A</div>
                      <div className="px-2 py-1 bg-red-200 rounded text-xs">D</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                    <span className="text-sm">→</span>
                    <div className="flex space-x-1">
                      <div className="px-2 py-1 bg-green-200 rounded text-xs">B</div>
                      <div className="px-2 py-1 bg-yellow-200 rounded text-xs">C</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">Complete Adjacency List Implementation:</h4>
            <pre className="text-sm font-mono bg-background p-3 rounded border overflow-x-auto">
{`// Adjacency List Implementation using Linked Lists
#include<stdio.h>
#include<stdlib.h>

struct Node {
    int vertex;
    struct Node* next;
};

struct Graph {
    int numVertices;
    struct Node** adjLists;
};

struct Node* createNode(int v) {
    struct Node* newNode = malloc(sizeof(struct Node));
    newNode->vertex = v;
    newNode->next = NULL;
    return newNode;
}

struct Graph* createGraph(int vertices) {
    struct Graph* graph = malloc(sizeof(struct Graph));
    graph->numVertices = vertices;
    graph->adjLists = malloc(vertices * sizeof(struct Node*));
    
    for(int i = 0; i < vertices; i++) {
        graph->adjLists[i] = NULL;
    }
    return graph;
}

void addEdge(struct Graph* graph, int src, int dest) {
    // Add edge from src to dest
    struct Node* newNode = createNode(dest);
    newNode->next = graph->adjLists[src];
    graph->adjLists[src] = newNode;
    
    // For undirected graph, add edge from dest to src
    newNode = createNode(src);
    newNode->next = graph->adjLists[dest];
    graph->adjLists[dest] = newNode;
}

void printGraph(struct Graph* graph) {
    for(int v = 0; v < graph->numVertices; v++) {
        struct Node* temp = graph->adjLists[v];
        printf("\\nVertex %d: ", v);
        while(temp) {
            printf("%d -> ", temp->vertex);
            temp = temp->next;
        }
        printf("NULL");
    }
}

int main() {
    int vertices, edges, src, dest;
    
    printf("Enter number of vertices: ");
    scanf("%d", &vertices);
    
    struct Graph* graph = createGraph(vertices);
    
    printf("Enter number of edges: ");
    scanf("%d", &edges);
    
    printf("Enter edges (src dest):\\n");
    for(int i = 0; i < edges; i++) {
        scanf("%d %d", &src, &dest);
        addEdge(graph, src, dest);
    }
    
    printf("\\nAdjacency List Representation:\\n");
    printGraph(graph);
    
    return 0;
}`}
            </pre>
          </div>

          <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
            <h4 className="font-semibold text-accent-foreground mb-2">Sample Input/Output for Adjacency List:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-sm mb-2">Sample Input:</p>
                <pre className="text-xs font-mono">
{`Enter number of vertices: 4
Enter number of edges: 4
Enter edges (src dest):
0 1
0 2
1 3
2 3`}
                </pre>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-sm mb-2">Sample Output:</p>
                <pre className="text-xs font-mono">
{`Adjacency List Representation:

Vertex 0: 2 -> 1 -> NULL
Vertex 1: 3 -> 0 -> NULL
Vertex 2: 3 -> 0 -> NULL
Vertex 3: 2 -> 1 -> NULL`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="bg-accent/20 p-4 rounded-lg">
            <h4 className="font-semibold text-accent-foreground mb-2">Adjacency List Properties:</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li><strong>Space Complexity:</strong> O(V + E) - only stores existing edges</li>
              <li><strong>Edge Check:</strong> O(degree of vertex) - scan adjacency list</li>
              <li><strong>Add Edge:</strong> O(1) - insert at beginning of list</li>
              <li><strong>Remove Edge:</strong> O(degree of vertex) - search and delete</li>
              <li><strong>Get all neighbors:</strong> O(degree of vertex) - traverse list</li>
              <li><strong>Memory Efficient</strong> for sparse graphs</li>
              <li><strong>Best for:</strong> Sparse graphs, graph traversal algorithms</li>
              <li><strong>Implementation:</strong> Arrays of linked lists or vectors</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Edge List and Other Representations</CardTitle>
          <CardDescription>Alternative graph representation methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">Edge List Representation:</h4>
            <p className="text-sm text-foreground mb-3">Store all edges as a simple list of vertex pairs. Most basic representation.</p>
            <pre className="text-sm font-mono bg-background p-3 rounded border overflow-x-auto">
{`// Edge List Implementation
#include<stdio.h>
#include<stdlib.h>

struct Edge {
    int src, dest;
    int weight; // For weighted graphs
};

struct Graph {
    int V, E;
    struct Edge* edges;
};

struct Graph* createGraph(int V, int E) {
    struct Graph* graph = malloc(sizeof(struct Graph));
    graph->V = V;
    graph->E = E;
    graph->edges = malloc(E * sizeof(struct Edge));
    return graph;
}

void addEdge(struct Graph* graph, int index, int src, int dest, int weight) {
    graph->edges[index].src = src;
    graph->edges[index].dest = dest;
    graph->edges[index].weight = weight;
}

void printEdges(struct Graph* graph) {
    printf("Edge List:\\n");
    for(int i = 0; i < graph->E; i++) {
        printf("Edge %d: (%d, %d) weight: %d\\n", 
               i, graph->edges[i].src, 
               graph->edges[i].dest, 
               graph->edges[i].weight);
    }
}

// Example usage
int main() {
    struct Graph* graph = createGraph(4, 4);
    
    addEdge(graph, 0, 0, 1, 5);  // A-B with weight 5
    addEdge(graph, 1, 1, 2, 3);  // B-C with weight 3
    addEdge(graph, 2, 2, 3, 7);  // C-D with weight 7
    addEdge(graph, 3, 0, 3, 2);  // A-D with weight 2
    
    printEdges(graph);
    return 0;
}`}
            </pre>
          </div>
          
          <div className="bg-secondary/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Representation Comparison Summary:</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border text-xs">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-2 text-left font-semibold">Representation</th>
                    <th className="border border-border p-2 text-left font-semibold">Space</th>
                    <th className="border border-border p-2 text-left font-semibold">Edge Check</th>
                    <th className="border border-border p-2 text-left font-semibold">Add Edge</th>
                    <th className="border border-border p-2 text-left font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-2 font-medium">Adjacency Matrix</td>
                    <td className="border border-border p-2">O(V²)</td>
                    <td className="border border-border p-2">O(1)</td>
                    <td className="border border-border p-2">O(1)</td>
                    <td className="border border-border p-2">Dense graphs, fast queries</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border p-2 font-medium">Adjacency List</td>
                    <td className="border border-border p-2">O(V+E)</td>
                    <td className="border border-border p-2">O(deg(v))</td>
                    <td className="border border-border p-2">O(1)</td>
                    <td className="border border-border p-2">Sparse graphs, traversals</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2 font-medium">Incidence Matrix</td>
                    <td className="border border-border p-2">O(V×E)</td>
                    <td className="border border-border p-2">O(E)</td>
                    <td className="border border-border p-2">O(V)</td>
                    <td className="border border-border p-2">Edge-centric operations</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border p-2 font-medium">Edge List</td>
                    <td className="border border-border p-2">O(E)</td>
                    <td className="border border-border p-2">O(E)</td>
                    <td className="border border-border p-2">O(1)</td>
                    <td className="border border-border p-2">Simple storage, algorithms</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Incidence Matrix Representation</CardTitle>
          <CardDescription>Matrix showing vertex-edge relationships</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            An incidence matrix is a V×E matrix where rows represent vertices and columns represent edges. 
            Element [i][j] = 1 if vertex i is incident on edge j.
          </p>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-4">Visual Incidence Matrix Example:</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold mb-3">Graph with Labeled Edges:</p>
                <svg width="180" height="140" className="bg-white border rounded">
                  <circle cx="45" cy="35" r="18" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                  <text x="45" y="42" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                  
                  <circle cx="135" cy="35" r="18" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                  <text x="135" y="42" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                  
                  <circle cx="45" cy="105" r="18" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                  <text x="45" y="112" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                  
                  <circle cx="135" cy="105" r="18" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                  <text x="135" y="112" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                  
                  <line x1="63" y1="35" x2="117" y2="35" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="45" y1="53" x2="45" y2="87" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="135" y1="53" x2="135" y2="87" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="63" y1="105" x2="117" y2="105" stroke="#6b7280" strokeWidth="2"/>
                  
                  {/* Edge labels */}
                  <text x="90" y="28" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">e₁</text>
                  <text x="35" y="70" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">e₂</text>
                  <text x="145" y="70" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">e₃</text>
                  <text x="90" y="120" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">e₄</text>
                </svg>
                <p className="text-xs text-muted-foreground mt-2">Edges: e₁(A-B), e₂(A-C), e₃(B-D), e₄(C-D)</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold mb-3">Incidence Matrix:</p>
                <div className="bg-white border rounded p-3">
                  <table className="text-xs font-mono">
                    <thead>
                      <tr>
                        <th className="p-1 border border-border"></th>
                        <th className="p-1 border border-border bg-red-100">e₁</th>
                        <th className="p-1 border border-border bg-red-100">e₂</th>
                        <th className="p-1 border border-border bg-red-100">e₃</th>
                        <th className="p-1 border border-border bg-red-100">e₄</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1 border border-border bg-blue-100 font-bold">A</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center">0</td>
                      </tr>
                      <tr>
                        <td className="p-1 border border-border bg-green-100 font-bold">B</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center">0</td>
                      </tr>
                      <tr>
                        <td className="p-1 border border-border bg-yellow-100 font-bold">C</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                      </tr>
                      <tr>
                        <td className="p-1 border border-border bg-red-100 font-bold">D</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center">0</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                        <td className="p-1 border border-border text-center bg-green-200">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-2">1 = vertex incident on edge</p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">Complete Implementation Code:</h4>
            <pre className="text-sm font-mono bg-background p-3 rounded border overflow-x-auto">
{`// Adjacency Matrix Complete Implementation
#include<stdio.h>
#include<conio.h>
#define MAX 20

int adj[MAX][MAX], n, edges;

void createGraph() {
    int i, j, u, v;
    
    printf("Enter number of vertices: ");
    scanf("%d", &n);
    
    // Initialize matrix
    for(i = 0; i < n; i++) {
        for(j = 0; j < n; j++) {
            adj[i][j] = 0;
        }
    }
    
    printf("Enter number of edges: ");
    scanf("%d", &edges);
    
    printf("Enter edges (u v):\\n");
    for(i = 0; i < edges; i++) {
        scanf("%d %d", &u, &v);
        adj[u][v] = 1;
        adj[v][u] = 1; // For undirected graph
    }
}

void displayMatrix() {
    int i, j;
    printf("\\nAdjacency Matrix:\\n   ");
    
    // Print column headers
    for(i = 0; i < n; i++) {
        printf("%d ", i);
    }
    printf("\\n");
    
    // Print matrix with row headers
    for(i = 0; i < n; i++) {
        printf("%d: ", i);
        for(j = 0; j < n; j++) {
            printf("%d ", adj[i][j]);
        }
        printf("\\n");
    }
}

void checkEdge() {
    int u, v;
    printf("\\nEnter vertices to check edge (u v): ");
    scanf("%d %d", &u, &v);
    
    if(adj[u][v] == 1) {
        printf("Edge exists between %d and %d\\n", u, v);
    } else {
        printf("No edge between %d and %d\\n", u, v);
    }
}

void findDegree() {
    int i, j, degree;
    printf("\\nDegree of each vertex:\\n");
    
    for(i = 0; i < n; i++) {
        degree = 0;
        for(j = 0; j < n; j++) {
            degree += adj[i][j];
        }
        printf("Vertex %d: Degree = %d\\n", i, degree);
    }
}

int main() {
    createGraph();
    displayMatrix();
    checkEdge();
    findDegree();
    return 0;
}`}
            </pre>
          </div>
          
          <div className="bg-accent/20 p-4 rounded-lg">
            <h4 className="font-semibold text-accent-foreground mb-2">Adjacency Matrix Properties:</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li><strong>Space Complexity:</strong> O(V²) - always V×V matrix</li>
              <li><strong>Edge Check:</strong> O(1) - direct matrix access A[i][j]</li>
              <li><strong>Add/Remove Edge:</strong> O(1) - single assignment operation</li>
              <li><strong>Get all neighbors:</strong> O(V) - scan entire row</li>
              <li><strong>Memory Usage:</strong> Fixed regardless of actual edges</li>
              <li><strong>Best for:</strong> Dense graphs, frequent edge queries</li>
              <li><strong>Worst for:</strong> Sparse graphs, memory-constrained systems</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTraversal = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Graph Traversal Overview</CardTitle>
          <CardDescription>Systematic methods to visit all vertices without creating loops</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground mb-4">
            Some applications of the graph require systematically visiting all the nodes. In a graph, we can reach to the 
            vertex from multiple paths existing in the graph, so we can say that graph traversal is not as simple as 
            traversal in other data structures. There are two standard traversal methods generally used with graph:
          </p>
          <div className="bg-accent/10 p-4 rounded-lg">
            <h4 className="font-semibold text-accent-foreground mb-2">Two Standard Graph Traversal Methods:</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li><strong>Breadth First Search (BFS)</strong></li>
              <li><strong>Depth First Search (DFS)</strong></li>
            </ul>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">Visual Graph Representation:</h4>
            <div className="flex justify-center">
              <svg width="300" height="200" className="bg-white border rounded">
                <circle cx="150" cy="40" r="18" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="150" y="46" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                
                <circle cx="100" cy="100" r="18" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                <text x="100" y="106" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E</text>
                
                <circle cx="50" cy="160" r="18" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                <text x="50" y="166" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                
                <circle cx="200" cy="100" r="18" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                <text x="200" y="106" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                
                <circle cx="250" cy="160" r="18" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                <text x="250" y="166" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">F</text>
                
                <circle cx="150" cy="160" r="18" fill="#ec4899" stroke="#db2777" strokeWidth="2"/>
                <text x="150" y="166" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                
                {/* Graph edges */}
                <line x1="138" y1="52" x2="112" y2="88" stroke="#6b7280" strokeWidth="2"/>
                <line x1="162" y1="52" x2="188" y2="88" stroke="#6b7280" strokeWidth="2"/>
                <line x1="88" y1="112" x2="62" y2="148" stroke="#6b7280" strokeWidth="2"/>
                <line x1="212" y1="112" x2="238" y2="148" stroke="#6b7280" strokeWidth="2"/>
                <line x1="118" y1="100" x2="132" y2="160" stroke="#6b7280" strokeWidth="2"/>
                
                <text x="150" y="20" textAnchor="middle" fontSize="14" fill="#6b7280" fontWeight="bold">Sample Graph for Traversal</text>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Breadth First Search (BFS)</CardTitle>
          <CardDescription>Explore all neighbors at current depth before going deeper</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            The general idea behind a BFS is that it starts traversing the graph from the starting node (any selected 
            node) and then traverses all the nodes which are directly connected to the starting node in a particular 
            order. In a graph traversal we have to keep track of the nodes that have been traversed, therefore queue 
            is an obvious choice to keep track of such nodes.
          </p>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">BFS Algorithm Steps (From PDF):</h4>
            <ol className="list-decimal list-inside space-y-1 text-foreground text-sm">
              <li>Start traversing the given graph with the given number of vertices and edges.</li>
              <li>Insert the starting source vertex S to the queue and mark it as visited.</li>
              <li><strong>Repeat:</strong></li>
              <li className="ml-4">a. Remove the front node K of the queue and examine it.</li>
              <li className="ml-4">b. Insert all the adjacent nodes of K (which are not visited so far) to the queue and mark them as visited.</li>
              <li>Until queue is empty.</li>
              <li>Exit.</li>
            </ol>
            <div className="mt-3 p-2 bg-green-50 rounded text-xs">
              <p><strong>BFS Advantage:</strong> If a solution to a particular problem exists then BFS guarantees to find it because it explores all the nodes.</p>
              <p><strong>BFS Disadvantage:</strong> It requires more memory and time for all the nodes to explore.</p>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">Problem 1 - BFS Traversal Starting from E (From PDF):</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold mb-3">Graph Structure:</p>
                <svg width="200" height="160" className="bg-white border rounded">
                  <circle cx="100" cy="30" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                  <text x="100" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                  
                  <circle cx="50" cy="80" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                  <text x="50" y="86" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E</text>
                  
                  <circle cx="30" cy="130" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                  <text x="30" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                  
                  <circle cx="150" cy="80" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                  <text x="150" y="86" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                  
                  <circle cx="170" cy="130" r="15" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                  <text x="170" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">F</text>
                  
                  <circle cx="80" cy="130" r="15" fill="#ec4899" stroke="#db2777" strokeWidth="2"/>
                  <text x="80" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                  
                  {/* Graph edges */}
                  <line x1="88" y1="42" x2="62" y2="68" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="112" y1="42" x2="138" y2="68" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="38" y1="92" x2="42" y2="118" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="162" y1="92" x2="158" y2="118" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="62" y1="92" x2="68" y2="118" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="138" y1="92" x2="155" y2="118" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="45" y1="130" x2="65" y2="130" stroke="#6b7280" strokeWidth="2"/>
                </svg>
              </div>
              
              <div>
                <p className="text-sm font-semibold mb-3">BFS Queue Visualization (PDF Steps):</p>
                <div className="bg-white border rounded p-3 text-xs space-y-3">
                  <div>
                    <p className="font-semibold">Step 1: Start with E</p>
                    <div className="flex items-center space-x-2">
                      <span>Queue:</span>
                      <div className="flex border border-gray-300">
                        <div className="bg-green-500 text-white px-2 py-1 text-xs">E</div>
                      </div>
                      <span>F=0, R=0</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Step 2: Remove E, add B,D</p>
                    <div className="flex items-center space-x-2">
                      <span>Queue:</span>
                      <div className="flex border border-gray-300">
                        <div className="bg-yellow-500 text-white px-2 py-1 text-xs">B</div>
                        <div className="bg-blue-500 text-white px-2 py-1 text-xs">D</div>
                      </div>
                      <span>F=0, R=2</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Step 3: Remove B, add A,C</p>
                    <div className="flex items-center space-x-2">
                      <span>Queue:</span>
                      <div className="flex border border-gray-300">
                        <div className="bg-blue-500 text-white px-2 py-1 text-xs">D</div>
                        <div className="bg-purple-500 text-white px-2 py-1 text-xs">A</div>
                        <div className="bg-red-500 text-white px-2 py-1 text-xs">C</div>
                      </div>
                      <span>F=1, R=4</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Step 4: Remove D, add F</p>
                    <div className="flex items-center space-x-2">
                      <span>Queue:</span>
                      <div className="flex border border-gray-300">
                        <div className="bg-purple-500 text-white px-2 py-1 text-xs">A</div>
                        <div className="bg-red-500 text-white px-2 py-1 text-xs">C</div>
                        <div className="bg-pink-500 text-white px-2 py-1 text-xs">F</div>
                      </div>
                      <span>F=2, R=5</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Continue until queue empty</p>
                    <div className="mt-2 p-2 bg-green-100 rounded">
                      <p className="font-bold text-green-800">Final BFS Order: E B D F A C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">Complete BFS Program (From PDF):</h4>
            <pre className="text-sm font-mono bg-background p-3 rounded border overflow-x-auto">
{`#include<stdio.h>
#include<conio.h>
#define MAX 10
#define True 1
#define False 0

int visited[MAX], i, j, k;
int MAT[MAX][MAX], N, node;

main() {
    clrscr();
    printf("Enter the order of the graph (maximum =%d): ", MAX);
    scanf("%d", &N);
    printf("\\nEnter the edges ");
    
    for(i = 0; i < N; i++) {
        visited[i] = 0;
        for(j = 0; j < N; j++) {
            printf("\\nEdge from v[%d] to [%d]: ", i, j);
            scanf("%d", &MAT[i][j]); /*Enter 1 for edge otherwise 0*/
        }
    }
    
    printf("Enter the node from where BFS is to start: ");
    scanf("%d", &node);
    BFS(node);
    getch();
}

BFS(int x) {
    int QUEUE[MAX], rear = -1, front = -1;
    
    visited[x] = 1;
    printf("\\nvisited node - %d", x);
    QUEUE[++rear] = x;
    x = QUEUE[++front];
    
    if(x == N-1) {
        printf("\\nAll nodes have been visited");
        exit(1);
    }
    
    printf("%d \\t", x);
    for(j = 0; j < N; j++) {
        if(MAT[x][j] == 1 && visited[j] == 0) {
            QUEUE[++rear] = j;
            BFS(j);
        }
    }
}`}
            </pre>
          </div>

          <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
            <h4 className="font-semibold text-accent-foreground mb-2">Sample BFS Input/Output (Complete Execution):</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-sm mb-2">Sample Input:</p>
                <pre className="text-xs font-mono">
{`Enter the order of the graph (maximum =10): 6
Enter the edges 
Edge from v[0] to [0]: 0
Edge from v[0] to [1]: 1
Edge from v[0] to [2]: 1
Edge from v[0] to [3]: 0
Edge from v[0] to [4]: 0
Edge from v[0] to [5]: 0
Edge from v[1] to [0]: 1
Edge from v[1] to [1]: 0
Edge from v[1] to [2]: 1
Edge from v[1] to [3]: 1
Edge from v[1] to [4]: 0
Edge from v[1] to [5]: 0
...
Enter the node from where BFS is to start: 4`}
                </pre>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-sm mb-2">Sample Output:</p>
                <pre className="text-xs font-mono">
{`visited node - 4
4 	
visited node - 1
1 	
visited node - 3
3 	
visited node - 5
5 	
visited node - 0
0 	
visited node - 2
2 	
All nodes have been visited

BFS Traversal Order: E B D F A C`}
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-accent/20 p-4 rounded-lg">
            <h4 className="font-semibold text-accent-foreground mb-2">BFS Properties and Characteristics:</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li><strong>Time Complexity:</strong> O(V + E) where V = vertices, E = edges</li>
              <li><strong>Space Complexity:</strong> O(V) for queue storage</li>
              <li><strong>Data Structure Used:</strong> Queue (FIFO - First In First Out)</li>
              <li><strong>Memory Usage:</strong> More memory than DFS (stores all nodes at current level)</li>
              <li><strong>Path Finding:</strong> Always finds shortest path in unweighted graphs</li>
              <li><strong>Level-wise Processing:</strong> All nodes at level k processed before level k+1</li>
              <li><strong>Advantage:</strong> Guarantees shortest path, systematic level exploration</li>
              <li><strong>Disadvantage:</strong> Requires more memory and time as it explores all nodes level by level</li>
              <li><strong>Best For:</strong> Shortest path, level-order traversal, web crawling, broadcasting</li>
              <li><strong>Applications in AI:</strong> Used extensively in artificial intelligence algorithms</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Depth First Search (DFS)</CardTitle>
          <CardDescription>Explore as far as possible along each branch before backtracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            The BFS takes more time and space because it traverses all the nodes. There is another method of graph 
            traversal called depth first search (DFS) in which all descends of a vertex (node) are processed before we 
            move to an adjacent vertex. The DFS algorithm is roughly analogous to tree traversal in pre-order.
          </p>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">DFS Algorithm Steps (From PDF):</h4>
            <ol className="list-decimal list-inside space-y-1 text-foreground text-sm">
              <li>Start traversing the given graph with the given number of vertices and edges.</li>
              <li>Push the starting source vertex S to the stack and mark it as visited.</li>
              <li><strong>Repeat:</strong></li>
              <li className="ml-4">a. Remove the top node K of the stack and examine it.</li>
              <li className="ml-4">b. Push all adjacent nodes of K (which are not visited so far) to the stack and mark them as visited.</li>
              <li>Until stack is empty</li>
              <li>Exit.</li>
            </ol>
            <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
              <p><strong>DFS Advantage:</strong> It gives the solution of the problem in lesser time and it requires less space.</p>
              <p><strong>DFS Disadvantage:</strong> We can blindly follow the path (by traversing the vertices lying in that path) in which solution does not exist.</p>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">Problem 2 - DFS Traversal Starting from A (From PDF):</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold mb-3">Graph Structure:</p>
                <svg width="200" height="160" className="bg-white border rounded">
                  <circle cx="100" cy="30" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                  <text x="100" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                  
                  <circle cx="50" cy="80" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                  <text x="50" y="86" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E</text>
                  
                  <circle cx="30" cy="130" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                  <text x="30" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                  
                  <circle cx="150" cy="80" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                  <text x="150" y="86" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                  
                  <circle cx="170" cy="130" r="15" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                  <text x="170" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">F</text>
                  
                  <circle cx="80" cy="130" r="15" fill="#ec4899" stroke="#db2777" strokeWidth="2"/>
                  <text x="80" y="136" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                  
                  {/* Graph edges */}
                  <line x1="88" y1="42" x2="62" y2="68" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="112" y1="42" x2="138" y2="68" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="38" y1="92" x2="42" y2="118" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="162" y1="92" x2="158" y2="118" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="62" y1="92" x2="68" y2="118" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="138" y1="92" x2="155" y2="118" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="45" y1="130" x2="65" y2="130" stroke="#6b7280" strokeWidth="2"/>
                </svg>
              </div>
              
              <div>
                <p className="text-sm font-semibold mb-3">DFS Stack Visualization (PDF Steps):</p>
                <div className="bg-white border rounded p-3 text-xs space-y-3">
                  <div>
                    <p className="font-semibold">Step 1: Push A to stack</p>
                    <div className="flex items-center space-x-2">
                      <span>Stack:</span>
                      <div className="flex flex-col border border-gray-300">
                        <div className="bg-red-500 text-white px-2 py-1 text-xs text-center">A</div>
                      </div>
                      <span>Top</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Step 2: Pop A, push C,B</p>
                    <div className="flex items-center space-x-2">
                      <span>Stack:</span>
                      <div className="flex flex-col border border-gray-300">
                        <div className="bg-red-500 text-white px-2 py-1 text-xs text-center">B</div>
                        <div className="bg-red-500 text-white px-2 py-1 text-xs text-center">C</div>
                      </div>
                      <span>Top</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Step 3: Pop B, push D,E,F</p>
                    <div className="flex items-center space-x-2">
                      <span>Stack:</span>
                      <div className="flex flex-col border border-gray-300">
                        <div className="bg-red-500 text-white px-2 py-1 text-xs text-center">D</div>
                        <div className="bg-blue-500 text-white px-2 py-1 text-xs text-center">E</div>
                        <div className="bg-purple-500 text-white px-2 py-1 text-xs text-center">F</div>
                        <div className="bg-gray-500 text-white px-2 py-1 text-xs text-center">C</div>
                      </div>
                      <span>Top</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Step 4: Pop D (no new)</p>
                    <div className="flex items-center space-x-2">
                      <span>Stack:</span>
                      <div className="flex flex-col border border-gray-300">
                        <div className="bg-red-500 text-white px-2 py-1 text-xs text-center">E</div>
                        <div className="bg-purple-500 text-white px-2 py-1 text-xs text-center">F</div>
                        <div className="bg-gray-500 text-white px-2 py-1 text-xs text-center">C</div>
                      </div>
                      <span>Top</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Continue: Pop E, F, C</p>
                    <div className="mt-2 p-2 bg-blue-100 rounded">
                      <p className="font-bold text-blue-800">Final DFS Order: A B D E F C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2">Complete DFS Program (From PDF):</h4>
            <pre className="text-sm font-mono bg-background p-3 rounded border overflow-x-auto">
{`#include<stdio.h>
#include<conio.h>
#define MAX 10
#define True 1
#define False 0

int visited[MAX], i, j, k, flag = 1;
int MAT[MAX][MAX], N, node;

main() {
    clrscr();
    printf("Enter the order of the graph (maximum =%d)", MAX);
    scanf("%d", &N);
    printf("\\nEnter the edges ");
    
    for(i = 0; i < N; i++) {
        visited[i] = 0;
        for(j = 0; j < N; j++) {
            printf("\\nEdge from v[%d] to [%d]: ", i, j);
            scanf("%d", &MAT[i][j]);
        }
    }
    
    printf("Enter the node from where DFS is to start: ");
    scanf("%d", &node);
    DFS(node);
    getch();
}

DFS(int x) {
    getch();
    visited[x] = 1;
    printf("\\nvisited node - %d", x);
    
    if(x == N-1) {
        printf("\\nAll nodes have been visited");
        exit(1);
    }
    
    for(j = 0; j < N; j++) {
        if(MAT[x][j] == 1 && visited[j] == 0) {
            DFS(j);
        }
    }
}`}
            </pre>
          </div>

          <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
            <h4 className="font-semibold text-accent-foreground mb-2">Sample DFS Input/Output (Complete Execution):</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-sm mb-2">Sample Input:</p>
                <pre className="text-xs font-mono">
{`Enter the order of the graph (maximum =10): 6
Enter the edges 
Edge from v[0] to [0]: 0
Edge from v[0] to [1]: 1
Edge from v[0] to [2]: 1
Edge from v[0] to [3]: 0
Edge from v[0] to [4]: 0
Edge from v[0] to [5]: 0
Edge from v[1] to [0]: 1
Edge from v[1] to [1]: 0
Edge from v[1] to [2]: 1
Edge from v[1] to [3]: 1
Edge from v[1] to [4]: 0
Edge from v[1] to [5]: 0
...
Enter the node from where DFS is to start: 0`}
                </pre>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-sm mb-2">Sample Output:</p>
                <pre className="text-xs font-mono">
{`visited node - 0
visited node - 1
visited node - 2
visited node - 3
visited node - 4
visited node - 5
All nodes have been visited

DFS Traversal Order: A B D E F C`}
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-accent/20 p-4 rounded-lg">
            <h4 className="font-semibold text-accent-foreground mb-2">DFS Properties and Characteristics:</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li><strong>Time Complexity:</strong> O(V + E) where V = vertices, E = edges</li>
              <li><strong>Space Complexity:</strong> O(V) for recursion stack</li>
              <li><strong>Data Structure Used:</strong> Stack (implicit via recursion or explicit)</li>
              <li><strong>Memory Usage:</strong> Less memory than BFS (only stores current path)</li>
              <li><strong>Path Finding:</strong> May not find shortest path - depends on traversal order</li>
              <li><strong>Traversal Analogy:</strong> Similar to pre-order traversal of trees</li>
              <li><strong>Advantage:</strong> Gives solution in lesser time and requires less space</li>
              <li><strong>Disadvantage:</strong> Can blindly follow path where solution doesn't exist</li>
              <li><strong>Best For:</strong> Cycle detection, topological sorting, maze solving, strongly connected components</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">DFS vs BFS Detailed Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left font-semibold">Aspect</th>
                  <th className="border border-border p-3 text-left font-semibold">DFS</th>
                  <th className="border border-border p-3 text-left font-semibold">BFS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 font-medium">Data Structure</td>
                  <td className="border border-border p-3">Stack (Recursion)</td>
                  <td className="border border-border p-3">Queue</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3 font-medium">Approach</td>
                  <td className="border border-border p-3">Goes deep into graph</td>
                  <td className="border border-border p-3">Goes wide level by level</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-medium">Memory Usage</td>
                  <td className="border border-border p-3">Less (O(h) height)</td>
                  <td className="border border-border p-3">More (O(w) width)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3 font-medium">Shortest Path</td>
                  <td className="border border-border p-3">No guarantee</td>
                  <td className="border border-border p-3">Guaranteed (unweighted)</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-medium">Implementation</td>
                  <td className="border border-border p-3">Recursive/Iterative</td>
                  <td className="border border-border p-3">Iterative only</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3 font-medium">Backtracking</td>
                  <td className="border border-border p-3">Natural backtracking</td>
                  <td className="border border-border p-3">No backtracking</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-medium">Best Use Case</td>
                  <td className="border border-border p-3">Cycle detection, Topological sort</td>
                  <td className="border border-border p-3">Shortest path, Level traversal</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3 font-medium">Time Complexity</td>
                  <td className="border border-border p-3">O(V + E)</td>
                  <td className="border border-border p-3">O(V + E)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="bg-secondary/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Implementation Note from PDF:</h4>
              <p className="text-sm text-foreground">
                In this method, the traversal starts at the starting source vertex and traverses all the nodes along the 
                path which begins at the source vertex. The implementation of the DFS is similar to the BFS except that 
                <strong> stack is used in place of queue</strong>. After coming to the end of the path, we backtrack on the 
                path until we can continue along another path and so on.
              </p>
            </div>
            
            <div className="bg-secondary/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Stack vs Queue Visual Comparison:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-center">
                  <h5 className="font-semibold text-red-600 mb-2">Stack (DFS) - LIFO</h5>
                  <div className="bg-white p-3 rounded border">
                    <div className="flex flex-col items-center space-y-1">
                      <div className="bg-red-500 text-white px-4 py-2 rounded">Push/Pop here ↓</div>
                      <div className="bg-red-200 px-4 py-1 rounded w-20">Top</div>
                      <div className="bg-red-100 px-4 py-1 rounded w-20">Mid</div>
                      <div className="bg-red-50 px-4 py-1 rounded w-20">Bottom</div>
                    </div>
                    <div className="mt-2 text-xs">Last In, First Out</div>
                  </div>
                </div>
                <div className="text-center">
                  <h5 className="font-semibold text-purple-600 mb-2">Queue (BFS) - FIFO</h5>
                  <div className="bg-background p-3 rounded border">
                    <div className="flex items-center justify-center space-x-1">
                      <div className="bg-purple-500 text-white px-2 py-2 rounded text-xs">Dequeue ←</div>
                      <div className="bg-purple-200 px-3 py-2 rounded">Front</div>
                      <div className="bg-purple-100 px-3 py-2 rounded">Mid</div>
                      <div className="bg-purple-50 px-3 py-2 rounded">Rear</div>
                      <div className="bg-purple-500 text-white px-2 py-2 rounded text-xs">→ Enqueue</div>
                    </div>
                    <div className="mt-2 text-xs">First In, First Out</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Key Differences Summary:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-accent-foreground">DFS Characteristics:</p>
                  <ul className="list-disc list-inside">
                    <li>Uses Stack (LIFO) - implicit recursion</li>
                    <li>Goes as deep as possible first</li>
                    <li>Backtracks when no more unvisited neighbors</li>
                    <li>Less memory usage</li>
                    <li>May not find shortest path</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-accent-foreground">BFS Characteristics:</p>
                  <ul className="list-disc list-inside">
                    <li>Uses Queue (FIFO) - explicit implementation</li>
                    <li>Explores all neighbors at current level first</li>
                    <li>No backtracking needed</li>
                    <li>More memory usage</li>
                    <li>Guarantees shortest path in unweighted graphs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTypes = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Types of Graph</CardTitle>
          <CardDescription>Comprehensive classification of different graph types with visual examples</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground mb-4">
            This section discusses the various types of graphs used in computer science and mathematics. 
            Each type has specific characteristics and applications.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">1. Simple Graph</CardTitle>
            <CardDescription>No loops or multiple edges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground text-base">
              A graph that does not contain any loop or multiple edges is called a simple graph.
            </p>
            <div className="flex justify-center">
              <svg width="200" height="140" className="bg-white border rounded">
                <circle cx="40" cy="30" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="40" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                
                <circle cx="120" cy="30" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                <text x="120" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                
                <circle cx="40" cy="80" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                <text x="40" y="86" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                
                <circle cx="120" cy="80" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                <text x="120" y="86" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                
                <circle cx="80" cy="110" r="15" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                <text x="80" y="116" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E</text>
                
                <circle cx="40" cy="110" r="15" fill="#ec4899" stroke="#db2777" strokeWidth="2"/>
                <text x="40" y="116" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">F</text>
                
                <line x1="55" y1="30" x2="105" y2="30" stroke="#6b7280" strokeWidth="2"/>
                <line x1="55" y1="80" x2="105" y2="80" stroke="#6b7280" strokeWidth="2"/>
                <line x1="40" y1="45" x2="40" y2="65" stroke="#6b7280" strokeWidth="2"/>
                <line x1="120" y1="45" x2="120" y2="65" stroke="#6b7280" strokeWidth="2"/>
                <line x1="55" y1="110" x2="65" y2="110" stroke="#6b7280" strokeWidth="2"/>
                
                <text x="100" y="15" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">Figure 2: Simple Graph</text>
              </svg>
            </div>
            <div className="bg-blue-50 p-3 rounded text-xs">
              <p><strong>Properties:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>No self-loops</li>
                <li>No parallel edges</li>
                <li>Most commonly used in basic algorithms</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">2. Multigraph</CardTitle>
            <CardDescription>Contains multiple edges between vertices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground text-base">
              A graph that contains more than one edge between two vertices is called a multigraph.
            </p>
            <div className="flex justify-center">
              <svg width="180" height="140" className="bg-white border rounded">
                <circle cx="40" cy="30" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="40" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                
                <circle cx="140" cy="30" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                <text x="140" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                
                <circle cx="40" cy="90" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                <text x="40" y="96" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                
                <circle cx="90" cy="110" r="15" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                <text x="90" y="116" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E</text>
                
                <circle cx="140" cy="90" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                <text x="140" y="96" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                
                <line x1="55" y1="30" x2="125" y2="30" stroke="#6b7280" strokeWidth="2"/>
                <line x1="40" y1="45" x2="40" y2="75" stroke="#6b7280" strokeWidth="2"/>
                <line x1="140" y1="45" x2="140" y2="75" stroke="#6b7280" strokeWidth="2"/>
                <line x1="55" y1="90" x2="75" y2="110" stroke="#6b7280" strokeWidth="2"/>
                <line x1="105" y1="110" x2="125" y2="90" stroke="#6b7280" strokeWidth="2"/>
                
                {/* Multiple edges between A and D */}
                <path d="M 55 30 Q 90 10 125 30" stroke="#dc2626" strokeWidth="2" fill="none"/>
                <path d="M 55 35 Q 90 55 125 35" stroke="#dc2626" strokeWidth="2" fill="none"/>
                
                <text x="90" y="125" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">Figure 3: Multigraph</text>
                <text x="90" y="5" textAnchor="middle" fontSize="9" fill="#dc2626">Two edges A-D</text>
              </svg>
            </div>
            <div className="bg-green-50 p-3 rounded text-xs">
              <p><strong>Properties:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Multiple edges allowed between same vertices</li>
                <li>No self-loops</li>
                <li>Example: Two edges between A and D</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">3. Directed Graph</CardTitle>
            <CardDescription>Edges have specific direction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground text-sm">
              A graph in which the set E of edges is a collection of ordered pairs of vertices. Each edge has direction.
            </p>
            <div className="flex justify-center">
              <svg width="200" height="140" className="bg-white border rounded">
                <circle cx="40" cy="30" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="40" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                
                <circle cx="120" cy="30" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                <text x="120" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                
                <circle cx="40" cy="80" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                <text x="40" y="86" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                
                <circle cx="120" cy="80" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                <text x="120" y="86" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                
                <circle cx="80" cy="110" r="15" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                <text x="80" y="116" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E</text>
                
                <circle cx="160" cy="110" r="15" fill="#ec4899" stroke="#db2777" strokeWidth="2"/>
                <text x="160" y="116" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">F</text>
                
                <defs>
                  <marker id="arrow3" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#6b7280"/>
                  </marker>
                </defs>
                
                <line x1="55" y1="30" x2="105" y2="30" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow3)"/>
                <line x1="55" y1="80" x2="105" y2="80" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow3)"/>
                <line x1="40" y1="45" x2="40" y2="65" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow3)"/>
                <line x1="120" y1="45" x2="120" y2="65" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow3)"/>
                <line x1="95" y1="110" x2="145" y2="110" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow3)"/>
                
                <text x="100" y="130" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">Figure 4: Directed Graph</text>
              </svg>
            </div>
            <div className="bg-purple-50 p-3 rounded text-xs">
              <p><strong>Properties:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Edges have direction (arrows)</li>
                <li>Can move A→B but not B→A</li>
                <li>In-degree and out-degree concepts apply</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">4. Undirected Graph</CardTitle>
            <CardDescription>Bidirectional movement allowed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground text-sm">
              A graph in which edges are unordered pairs of vertices. You can move in either direction along an edge.
            </p>
            <div className="flex justify-center">
              <svg width="200" height="140" className="bg-white border rounded">
                <circle cx="40" cy="30" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="40" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                
                <circle cx="120" cy="30" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                <text x="120" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                
                <circle cx="40" cy="80" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                <text x="40" y="86" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                
                <circle cx="120" cy="80" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                <text x="120" y="86" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                
                <circle cx="80" cy="110" r="15" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                <text x="80" y="116" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E</text>
                
                <circle cx="160" cy="110" r="15" fill="#ec4899" stroke="#db2777" strokeWidth="2"/>
                <text x="160" y="116" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">F</text>
                
                <line x1="55" y1="30" x2="105" y2="30" stroke="#6b7280" strokeWidth="2"/>
                <line x1="55" y1="80" x2="105" y2="80" stroke="#6b7280" strokeWidth="2"/>
                <line x1="40" y1="45" x2="40" y2="65" stroke="#6b7280" strokeWidth="2"/>
                <line x1="120" y1="45" x2="120" y2="65" stroke="#6b7280" strokeWidth="2"/>
                <line x1="95" y1="110" x2="145" y2="110" stroke="#6b7280" strokeWidth="2"/>
                
                <text x="100" y="130" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">Figure 5: Undirected Graph</text>
              </svg>
            </div>
            <div className="bg-blue-50 p-3 rounded text-xs">
              <p><strong>Properties:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>No edge direction</li>
                <li>Bidirectional movement</li>
                <li>Symmetric relationships</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">5. Weighted Graph</CardTitle>
            <CardDescription>Edges have assigned weights/costs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground text-sm">
              A graph in which weights (non-negative cost) are assigned to each edge is called a weighted graph.
            </p>
            <div className="flex justify-center">
              <svg width="200" height="140" className="bg-white border rounded">
                <circle cx="40" cy="30" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="40" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                
                <circle cx="160" cy="30" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                <text x="160" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                
                <circle cx="40" cy="90" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                <text x="40" y="96" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                
                <circle cx="160" cy="90" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                <text x="160" y="96" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                
                <circle cx="120" cy="110" r="15" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                <text x="120" y="116" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E</text>
                
                <line x1="55" y1="30" x2="145" y2="30" stroke="#6b7280" strokeWidth="2"/>
                <line x1="55" y1="90" x2="145" y2="90" stroke="#6b7280" strokeWidth="2"/>
                <line x1="40" y1="45" x2="40" y2="75" stroke="#6b7280" strokeWidth="2"/>
                <line x1="160" y1="45" x2="160" y2="75" stroke="#6b7280" strokeWidth="2"/>
                <line x1="55" y1="95" x2="105" y2="105" stroke="#6b7280" strokeWidth="2"/>
                <line x1="135" y1="105" x2="145" y2="90" stroke="#6b7280" strokeWidth="2"/>
                
                {/* Weight labels */}
                <circle cx="100" cy="25" r="12" fill="#ffffff" stroke="#6b7280" strokeWidth="1"/>
                <text x="100" y="30" textAnchor="middle" fontSize="10" fontWeight="bold">4</text>
                
                <circle cx="100" cy="95" r="12" fill="#ffffff" stroke="#6b7280" strokeWidth="1"/>
                <text x="100" y="100" textAnchor="middle" fontSize="10" fontWeight="bold">3</text>
                
                <circle cx="30" cy="60" r="12" fill="#ffffff" stroke="#6b7280" strokeWidth="1"/>
                <text x="30" y="65" textAnchor="middle" fontSize="10" fontWeight="bold">5</text>
                
                <circle cx="170" cy="60" r="12" fill="#ffffff" stroke="#6b7280" strokeWidth="1"/>
                <text x="170" y="65" textAnchor="middle" fontSize="10" fontWeight="bold">7</text>
                
                <circle cx="80" cy="105" r="12" fill="#ffffff" stroke="#6b7280" strokeWidth="1"/>
                <text x="80" y="110" textAnchor="middle" fontSize="10" fontWeight="bold">4</text>
                
                <circle cx="150" cy="105" r="12" fill="#ffffff" stroke="#6b7280" strokeWidth="1"/>
                <text x="150" y="110" textAnchor="middle" fontSize="10" fontWeight="bold">8</text>
                
                <text x="100" y="135" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">Figure 6: Weighted Graph</text>
              </svg>
            </div>
            <div className="bg-yellow-50 p-3 rounded text-xs">
              <p><strong>Properties:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Each edge has numerical weight</li>
                <li>Weights represent cost, distance, or capacity</li>
                <li>Used in shortest path algorithms</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">6. Regular Graph</CardTitle>
            <CardDescription>All vertices have same degree k</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground text-sm">
              A graph in which each vertex has the same degree "k" is called k-regular graph.
            </p>
            <div className="flex justify-center">
              <svg width="140" height="100" className="bg-white border rounded">
                <circle cx="40" cy="30" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="40" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                
                <circle cx="100" cy="30" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                <text x="100" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                
                <circle cx="40" cy="70" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                <text x="40" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                
                <circle cx="100" cy="70" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                <text x="100" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                
                <line x1="55" y1="30" x2="85" y2="30" stroke="#6b7280" strokeWidth="2"/>
                <line x1="55" y1="70" x2="85" y2="70" stroke="#6b7280" strokeWidth="2"/>
                <line x1="40" y1="45" x2="40" y2="55" stroke="#6b7280" strokeWidth="2"/>
                <line x1="100" y1="45" x2="100" y2="55" stroke="#6b7280" strokeWidth="2"/>
                
                <text x="70" y="95" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">Figure 7: 2-Regular Graph</text>
              </svg>
            </div>
            <div className="bg-indigo-50 p-3 rounded text-xs">
              <p><strong>Properties:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>All vertices have same degree k</li>
                <li>Example: 2-regular (each vertex degree 2)</li>
                <li>Highly symmetric structure</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">7. Complete Graph</CardTitle>
            <CardDescription>Every vertex connected to every other</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground text-sm">
              A graph where every vertex is connected to every other vertex. Contains n(n-1)/2 edges for n vertices.
            </p>
            <div className="flex justify-center">
              <svg width="140" height="100" className="bg-white border rounded">
                <circle cx="40" cy="30" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="40" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                
                <circle cx="100" cy="30" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                <text x="100" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                
                <circle cx="40" cy="70" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                <text x="40" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                
                <circle cx="100" cy="70" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                <text x="100" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                
                {/* All possible edges */}
                <line x1="55" y1="30" x2="85" y2="30" stroke="#6b7280" strokeWidth="2"/>
                <line x1="55" y1="70" x2="85" y2="70" stroke="#6b7280" strokeWidth="2"/>
                <line x1="40" y1="45" x2="40" y2="55" stroke="#6b7280" strokeWidth="2"/>
                <line x1="100" y1="45" x2="100" y2="55" stroke="#6b7280" strokeWidth="2"/>
                <line x1="55" y1="35" x2="85" y2="65" stroke="#6b7280" strokeWidth="2"/>
                <line x1="55" y1="65" x2="85" y2="35" stroke="#6b7280" strokeWidth="2"/>
                
                <text x="70" y="95" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">Figure 8: Complete Graph</text>
              </svg>
            </div>
            <div className="bg-blue-50 p-3 rounded text-xs">
              <p><strong>Properties:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Every vertex connected to every other</li>
                <li>Formula: n(n-1)/2 edges for n vertices</li>
                <li>Maximum possible edges for simple graph</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">8. Strongly Connected</CardTitle>
            <CardDescription>Directed graph with paths between all vertices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground text-sm">
              Used with directed graphs where each vertex is connected to every other vertex with direction.
            </p>
            <div className="flex justify-center">
              <svg width="140" height="100" className="bg-white border rounded">
                <circle cx="40" cy="30" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="40" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                
                <circle cx="100" cy="30" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                <text x="100" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                
                <circle cx="40" cy="70" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                <text x="40" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                
                <circle cx="100" cy="70" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                <text x="100" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                
                <defs>
                  <marker id="arrow4" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#6b7280"/>
                  </marker>
                </defs>
                
                <line x1="55" y1="30" x2="85" y2="30" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow4)"/>
                <line x1="85" y1="70" x2="55" y2="70" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow4)"/>
                <line x1="40" y1="45" x2="40" y2="55" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow4)"/>
                <line x1="100" y1="55" x2="100" y2="45" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow4)"/>
                
                <text x="70" y="95" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">Figure 9: Strongly Connected</text>
              </svg>
            </div>
            <div className="bg-green-50 p-3 rounded text-xs">
              <p><strong>Properties:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Every vertex reachable from every other</li>
                <li>Directed paths between all vertex pairs</li>
                <li>Important in network analysis</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">9. Weakly Connected</CardTitle>
            <CardDescription>Not all vertices are reachable</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground text-sm">
              A directed graph is weakly connected if at least two vertices are not connected.
            </p>
            <div className="flex justify-center">
              <svg width="140" height="100" className="bg-white border rounded">
                <circle cx="40" cy="30" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="40" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                
                <circle cx="100" cy="30" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                <text x="100" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                
                <circle cx="40" cy="70" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                <text x="40" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                
                <circle cx="100" cy="70" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                <text x="100" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                
                <defs>
                  <marker id="arrow5" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#6b7280"/>
                  </marker>
                </defs>
                
                <line x1="55" y1="30" x2="85" y2="30" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow5)"/>
                <line x1="40" y1="45" x2="40" y2="55" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow5)"/>
                <line x1="85" y1="70" x2="55" y2="70" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow5)"/>
                
                {/* Missing connection indicator */}
                <line x1="100" y1="45" x2="100" y2="55" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3"/>
                <text x="115" y="52" fontSize="8" fill="#dc2626">Missing</text>
                
                <text x="70" y="95" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">Figure 10: Weakly Connected</text>
              </svg>
            </div>
            <div className="bg-red-50 p-3 rounded text-xs">
              <p><strong>Properties:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Not all vertices reachable from each other</li>
                <li>Missing directed paths between some vertices</li>
                <li>Opposite of strongly connected</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">10. Isomorphic Graphs</CardTitle>
          <CardDescription>Structurally identical graphs with different layouts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground text-sm">
            Two graphs in which there is a one-to-one correspondence between their vertices and edges are said to be isomorphic graphs.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <p className="font-semibold mb-2">Graph (a)</p>
              <div className="flex justify-center">
                <svg width="120" height="100" className="bg-white border rounded">
                  <circle cx="30" cy="30" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                  <text x="30" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E</text>
                  
                  <circle cx="90" cy="30" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                  <text x="90" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">F</text>
                  
                  <circle cx="30" cy="70" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                  <text x="30" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">G</text>
                  
                  <circle cx="90" cy="70" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                  <text x="90" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">H</text>
                  
                  <line x1="45" y1="30" x2="75" y2="30" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="45" y1="70" x2="75" y2="70" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="30" y1="45" x2="30" y2="55" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="90" y1="45" x2="90" y2="55" stroke="#6b7280" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            
            <div className="text-center">
              <p className="font-semibold mb-2">Graph (b)</p>
              <div className="flex justify-center">
                <svg width="120" height="100" className="bg-white border rounded">
                  <circle cx="30" cy="30" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                  <text x="30" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                  
                  <circle cx="90" cy="30" r="15" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                  <text x="90" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                  
                  <circle cx="30" cy="70" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                  <text x="30" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                  
                  <circle cx="90" cy="70" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                  <text x="90" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                  
                  <line x1="45" y1="30" x2="75" y2="30" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="45" y1="70" x2="75" y2="70" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="30" y1="45" x2="30" y2="55" stroke="#6b7280" strokeWidth="2"/>
                  <line x1="90" y1="45" x2="90" y2="55" stroke="#6b7280" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded text-xs text-center">
            <p className="font-semibold">Figure 11: Isomorphic Graphs</p>
            <p><strong>Properties:</strong> Same structure, different vertex labels and arrangement</p>
            <p>One-to-one correspondence: E↔A, F↔C, G↔B, H↔D</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'definitions':
        return renderDefinitions();
      case 'terminology':
        return renderTerminology();
      case 'types':
        return renderTypes();
      case 'representation':
        return renderRepresentation();
      case 'traversal':
        return renderTraversal();
      default:
        return renderDefinitions();
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Graph Theory Study Notes</h1>
          <p className="text-muted-foreground">
            Comprehensive notes on graph theory fundamentals, representations, and algorithms
          </p>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.id)}
                className="min-w-fit"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="transition-all duration-300">
          {renderContent()}
        </div>

        <div className="mt-12 text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Quick Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-muted p-3 rounded">
                  <strong>Time Complexities:</strong>
                  <br />• DFS/BFS: O(V + E)
                  <br />• Adjacency Matrix: O(V²) space
                  <br />• Adjacency List: O(V + E) space
                </div>
                <div className="bg-muted p-3 rounded">
                  <strong>Key Applications:</strong>
                  <br />• Social Networks
                  <br />• Web Page Ranking
                  <br />• GPS Navigation
                  <br />• Network Routing
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GraphTheoryNotes;
