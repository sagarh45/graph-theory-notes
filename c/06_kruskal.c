/* Kruskal's minimum spanning tree with union-find */
#include <stdio.h>
#define MAX 50

struct edge { int u, v, w; };

struct edge E[MAX];
int parent[MAX];
int n, e;

int find(int x) {                         /* root of x's set (with path compression) */
    if (parent[x] != x)
        parent[x] = find(parent[x]);
    return parent[x];
}

void sortEdges() {                        /* simple bubble sort by weight */
    int i, j;
    struct edge t;
    for (i = 0; i < e - 1; i++)
        for (j = 0; j < e - 1 - i; j++)
            if (E[j].w > E[j + 1].w) { t = E[j]; E[j] = E[j + 1]; E[j + 1] = t; }
}

int main() {
    int i, taken = 0, total = 0, ru, rv;
    char a, b;
    printf("Number of vertices: ");
    scanf("%d", &n);
    printf("Number of edges: ");
    scanf("%d", &e);
    for (i = 0; i < e; i++) {
        printf("Edge %d (u v weight): ", i + 1);
        scanf(" %c %c %d", &a, &b, &E[i].w);
        E[i].u = a - 'A';
        E[i].v = b - 'A';
    }
    for (i = 0; i < n; i++) parent[i] = i;  /* every vertex is its own set */
    sortEdges();

    printf("\nEdge   Weight  Result\n");
    for (i = 0; i < e && taken < n - 1; i++) {
        ru = find(E[i].u);
        rv = find(E[i].v);
        if (ru != rv) {
            parent[ru] = rv;                  /* union */
            taken++;
            total += E[i].w;
            printf("%c - %c   %2d    taken\n", 'A' + E[i].u, 'A' + E[i].v, E[i].w);
        } else {
            printf("%c - %c   %2d    rejected (cycle)\n", 'A' + E[i].u, 'A' + E[i].v, E[i].w);
        }
    }
    printf("Total weight of MST = %d\n", total);
    return 0;
}
