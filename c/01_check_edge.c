/* Adjacency matrix: create, display, and check if an edge is present
   between two vertices. Vertices are numbered 0, 1, 2, ...
   (conio.h from the old listing is not used, so it is omitted.) */
#include <stdio.h>
#define MAX 20

int adj[MAX][MAX], n, edges;

void createGraph() {
    int i, j, u, v;

    printf("Enter number of vertices: ");
    scanf("%d", &n);

    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            adj[i][j] = 0;
        }
    }

    printf("Enter number of edges: ");
    scanf("%d", &edges);

    printf("Enter edges (u v):\n");
    for (i = 0; i < edges; i++) {
        scanf("%d %d", &u, &v);
        adj[u][v] = 1;
        adj[v][u] = 1; /* undirected graph: both ways */
    }
}

void displayMatrix() {
    int i, j;
    printf("\nAdjacency Matrix:\n   ");

    for (i = 0; i < n; i++) {
        printf("%d ", i);
    }
    printf("\n");

    for (i = 0; i < n; i++) {
        printf("%d: ", i);
        for (j = 0; j < n; j++) {
            printf("%d ", adj[i][j]);
        }
        printf("\n");
    }
}

void checkEdge() {
    int u, v;
    printf("\nEnter vertices to check edge (u v): ");
    scanf("%d %d", &u, &v);

    if (adj[u][v] == 1) {
        printf("Edge exists between %d and %d\n", u, v);
    } else {
        printf("No edge between %d and %d\n", u, v);
    }
}

int main() {
    createGraph();
    displayMatrix();
    checkEdge();
    return 0;
}
