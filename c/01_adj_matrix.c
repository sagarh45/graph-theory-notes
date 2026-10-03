/* Adjacency matrix: create, display, degree of every vertex */
#include <stdio.h>
#define MAX 20

int adj[MAX][MAX];
int n, directed;

void createGraph() {
    int e, i;
    char u, v;
    printf("Number of vertices: ");
    scanf("%d", &n);
    printf("Directed? (1 = yes, 0 = no): ");
    scanf("%d", &directed);
    printf("Number of edges: ");
    scanf("%d", &e);
    for (i = 0; i < e; i++) {
        printf("Edge %d (e.g. A B): ", i + 1);
        scanf(" %c %c", &u, &v);
        adj[u - 'A'][v - 'A'] = 1;
        if (!directed)
            adj[v - 'A'][u - 'A'] = 1;   /* undirected: both ways */
    }
}

void displayMatrix() {
    int i, j;
    printf("\nAdjacency matrix:\n   ");
    for (j = 0; j < n; j++) printf(" %c", 'A' + j);
    printf("\n");
    for (i = 0; i < n; i++) {
        printf(" %c ", 'A' + i);
        for (j = 0; j < n; j++) printf(" %d", adj[i][j]);
        printf("\n");
    }
}

void degrees() {
    int i, j, in, out;
    printf("\nVertex  ");
    printf(directed ? "In  Out\n" : "Degree\n");
    for (i = 0; i < n; i++) {
        in = out = 0;
        for (j = 0; j < n; j++) {
            out += adj[i][j];            /* row sum    */
            in  += adj[j][i];            /* column sum */
        }
        if (directed) printf("  %c     %d   %d\n", 'A' + i, in, out);
        else          printf("  %c     %d\n", 'A' + i, out);
    }
}

int main() {
    createGraph();
    displayMatrix();
    degrees();
    return 0;
}
