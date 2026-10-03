/* Depth First Search: recursive version and explicit-stack version */
#include <stdio.h>
#define MAX 20

int adj[MAX][MAX], visited[MAX];
int n;

void dfs(int u) {                         /* recursive: uses the call stack */
    int v;
    visited[u] = 1;
    printf("%c ", 'A' + u);
    for (v = 0; v < n; v++)
        if (adj[u][v] == 1 && !visited[v])
            dfs(v);
}

void dfsStack(int start) {                /* same order with our own stack */
    int stack[MAX * MAX], top = -1, u, v;
    stack[++top] = start;
    while (top >= 0) {
        u = stack[top--];                 /* pop */
        if (visited[u]) continue;
        visited[u] = 1;
        printf("%c ", 'A' + u);
        for (v = n - 1; v >= 0; v--)      /* push in reverse so A..Z come out first */
            if (adj[u][v] == 1 && !visited[v])
                stack[++top] = v;
    }
}

int main() {
    int e, i;
    char u, v, s;
    printf("Number of vertices: ");
    scanf("%d", &n);
    printf("Number of edges: ");
    scanf("%d", &e);
    for (i = 0; i < e; i++) {
        printf("Edge %d: ", i + 1);
        scanf(" %c %c", &u, &v);
        adj[u - 'A'][v - 'A'] = adj[v - 'A'][u - 'A'] = 1;
    }
    printf("Start vertex: ");
    scanf(" %c", &s);

    printf("\nDFS (recursive): ");
    dfs(s - 'A');

    for (i = 0; i < n; i++) visited[i] = 0;
    printf("\nDFS (stack)    : ");
    dfsStack(s - 'A');
    printf("\n");
    return 0;
}
