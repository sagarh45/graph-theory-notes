/* Strongly connected components with Kosaraju's algorithm, O(V + E)
   Pass 1: DFS on G, push each vertex when it finishes.
   Pass 2: DFS on the reversed graph in reverse finish order. */
#include <stdio.h>
#define MAX 20

int adj[MAX][MAX], visited[MAX], stack[MAX], top = -1;
int n;

void dfs1(int u) {
    int v;
    visited[u] = 1;
    for (v = 0; v < n; v++)
        if (adj[u][v] && !visited[v]) dfs1(v);
    stack[++top] = u;                       /* finished: push */
}

void dfs2(int u) {                          /* uses reversed edges: adj[v][u] */
    int v;
    visited[u] = 1;
    printf(" %c", 'A' + u);
    for (v = 0; v < n; v++)
        if (adj[v][u] && !visited[v]) dfs2(v);
}

int main() {
    int e, i, count = 0;
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
    for (i = 0; i < n; i++)
        if (!visited[i]) dfs1(i);
    printf("\nFinish order:");
    for (i = 0; i <= top; i++) printf(" %c", 'A' + stack[i]);
    printf("\n");
    for (i = 0; i < n; i++) visited[i] = 0;
    while (top >= 0) {
        int x = stack[top--];
        if (!visited[x]) {
            printf("SCC %d:", ++count);
            dfs2(x);
            printf("\n");
        }
    }
    printf("Number of SCCs = %d\n", count);
    return 0;
}
