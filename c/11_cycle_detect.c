/* Cycle detection in a directed graph using DFS colours
   0 = white (not visited), 1 = grey (on the current path), 2 = black (finished) */
#include <stdio.h>
#define MAX 20

int adj[MAX][MAX], color[MAX], parent[MAX];
int n;

int dfs(int u) {
    int v, x;
    color[u] = 1;                                   /* grey: on the path */
    for (v = 0; v < n; v++) {
        if (!adj[u][v]) continue;
        if (color[v] == 1) {                        /* back edge -> cycle */
            printf("Cycle found: %c", 'A' + v);
            {   int path[MAX], k = 0;
                for (x = u; x != v; x = parent[x]) path[k++] = x;
                while (k > 0) printf(" -> %c", 'A' + path[--k]);
            }
            printf(" -> %c\n", 'A' + v);
            return 1;
        }
        if (color[v] == 0) {
            parent[v] = u;
            if (dfs(v)) return 1;
        }
    }
    color[u] = 2;                                   /* black: finished */
    return 0;
}

int main() {
    int e, i;
    char u, v;
    printf("Number of vertices: ");
    scanf("%d", &n);
    printf("Number of directed edges: ");
    scanf("%d", &e);
    for (i = 0; i < e; i++) {
        printf("Edge %d (u v): ", i + 1);
        scanf(" %c %c", &u, &v);
        adj[u - 'A'][v - 'A'] = 1;
    }
    printf("\n");
    for (i = 0; i < n; i++) {
        if (color[i] == 0) {
            parent[i] = -1;
            if (dfs(i)) return 0;
        }
    }
    printf("No cycle: the graph is a DAG.\n");
    return 0;
}
