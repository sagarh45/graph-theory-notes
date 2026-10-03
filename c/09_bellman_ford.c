/* Bellman-Ford shortest paths (negative weights allowed), O(V * E) */
#include <stdio.h>
#include <limits.h>
#define MAX 20
#define MAXE 100

struct Edge { int u, v, w; } E[MAXE];
int n, e;

void printPath(int prev[], int v) {
    if (prev[v] != -1) {
        printPath(prev, prev[v]);
        printf(" -> ");
    }
    printf("%c", 'A' + v);
}

void bellmanFord(int s) {
    int dist[MAX], prev[MAX];
    int i, j, pass, changed;
    for (i = 0; i < n; i++) {
        dist[i] = INT_MAX;
        prev[i] = -1;
    }
    dist[s] = 0;
    for (pass = 1; pass <= n - 1; pass++) {       /* relax every edge n-1 times */
        changed = 0;
        for (j = 0; j < e; j++) {
            int u = E[j].u, v = E[j].v, w = E[j].w;
            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                prev[v] = u;
                changed = 1;
            }
        }
        if (!changed) break;                      /* nothing improved: stop early */
    }
    for (j = 0; j < e; j++)                       /* one more pass: negative cycle? */
        if (dist[E[j].u] != INT_MAX && dist[E[j].u] + E[j].w < dist[E[j].v]) {
            printf("\nNegative cycle found: shortest paths are not defined.\n");
            return;
        }
    printf("\nPasses used: %d\n", pass > n - 1 ? n - 1 : pass);
    printf("Vertex  Distance  Path\n");
    for (i = 0; i < n; i++) {
        if (dist[i] == INT_MAX) { printf("  %c     unreachable\n", 'A' + i); continue; }
        printf("  %c     %4d      ", 'A' + i, dist[i]);
        printPath(prev, i);
        printf("\n");
    }
}

int main() {
    int i, w;
    char u, v, s;
    printf("Number of vertices: ");
    scanf("%d", &n);
    printf("Number of directed edges: ");
    scanf("%d", &e);
    for (i = 0; i < e; i++) {
        printf("Edge %d (u v weight): ", i + 1);
        scanf(" %c %c %d", &u, &v, &w);
        E[i].u = u - 'A'; E[i].v = v - 'A'; E[i].w = w;
    }
    printf("Source vertex: ");
    scanf(" %c", &s);
    bellmanFord(s - 'A');
    return 0;
}
