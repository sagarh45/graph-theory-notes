/* Prim's minimum spanning tree, O(n^2) with an adjacency matrix */
#include <stdio.h>
#include <limits.h>
#define MAX 20

int cost[MAX][MAX];     /* 0 = no edge */
int n;

void prim(int start) {
    int key[MAX], parent[MAX], inTree[MAX];
    int i, k, u, v, total = 0;
    for (i = 0; i < n; i++) {
        key[i] = INT_MAX;
        parent[i] = -1;
        inTree[i] = 0;
    }
    key[start] = 0;
    printf("\nEdge   Weight\n");
    for (k = 0; k < n; k++) {
        u = -1;                                   /* pick the smallest key */
        for (i = 0; i < n; i++)
            if (!inTree[i] && key[i] != INT_MAX && (u == -1 || key[i] < key[u]))
                u = i;
        if (u == -1) { printf("Graph is not connected\n"); return; }
        inTree[u] = 1;
        if (parent[u] != -1) {
            printf("%c - %c   %d\n", 'A' + parent[u], 'A' + u, cost[parent[u]][u]);
            total += cost[parent[u]][u];
        }
        for (v = 0; v < n; v++)                   /* update keys of neighbours */
            if (cost[u][v] && !inTree[v] && cost[u][v] < key[v]) {
                key[v] = cost[u][v];
                parent[v] = u;
            }
    }
    printf("Total weight of MST = %d\n", total);
}

int main() {
    int e, i, w;
    char u, v, s;
    printf("Number of vertices: ");
    scanf("%d", &n);
    printf("Number of edges: ");
    scanf("%d", &e);
    for (i = 0; i < e; i++) {
        printf("Edge %d (u v weight): ", i + 1);
        scanf(" %c %c %d", &u, &v, &w);
        cost[u - 'A'][v - 'A'] = cost[v - 'A'][u - 'A'] = w;
    }
    printf("Start vertex: ");
    scanf(" %c", &s);
    prim(s - 'A');
    return 0;
}
