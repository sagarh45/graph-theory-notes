/* Bridges and articulation points (cut vertices) with Tarjan's DFS, O(V + E) */
#include <stdio.h>
#define MAX 20

int adj[MAX][MAX], disc[MAX], low[MAX], parent[MAX], isCut[MAX];
int n, timer = 0;

int min(int a, int b) { return a < b ? a : b; }

void dfs(int u) {
    int v, children = 0;
    disc[u] = low[u] = ++timer;
    for (v = 0; v < n; v++) {
        if (!adj[u][v]) continue;
        if (disc[v] == 0) {                       /* tree edge */
            children++;
            parent[v] = u;
            dfs(v);
            low[u] = min(low[u], low[v]);
            if (low[v] > disc[u])
                printf("Bridge: %c - %c\n", 'A' + u, 'A' + v);
            if (parent[u] != -1 && low[v] >= disc[u])
                isCut[u] = 1;
        } else if (v != parent[u]) {              /* back edge */
            low[u] = min(low[u], disc[v]);
        }
    }
    if (parent[u] == -1 && children >= 2)         /* root rule */
        isCut[u] = 1;
}

int main() {
    int e, i;
    char u, v;
    printf("Number of vertices: ");
    scanf("%d", &n);
    printf("Number of edges: ");
    scanf("%d", &e);
    for (i = 0; i < e; i++) {
        printf("Edge %d (u v): ", i + 1);
        scanf(" %c %c", &u, &v);
        adj[u - 'A'][v - 'A'] = adj[v - 'A'][u - 'A'] = 1;
    }
    printf("\n");
    for (i = 0; i < n; i++)
        if (disc[i] == 0) { parent[i] = -1; dfs(i); }
    printf("Cut vertices:");
    for (i = 0; i < n; i++) if (isCut[i]) printf(" %c", 'A' + i);
    printf("\n\nVertex  disc  low\n");
    for (i = 0; i < n; i++) printf("  %c     %2d   %2d\n", 'A' + i, disc[i], low[i]);
    return 0;
}
