/* Topological sort (Kahn's algorithm) on a directed graph */
#include <stdio.h>
#define MAX 20

int adj[MAX][MAX], indeg[MAX];
int n;

int main() {
    int e, i, v, u, queue[MAX], front = 0, rear = -1, count = 0;
    char a, b;
    printf("Number of vertices: ");
    scanf("%d", &n);
    printf("Number of edges: ");
    scanf("%d", &e);
    for (i = 0; i < e; i++) {
        printf("Edge %d (from to): ", i + 1);
        scanf(" %c %c", &a, &b);
        adj[a - 'A'][b - 'A'] = 1;
        indeg[b - 'A']++;
    }
    for (i = 0; i < n; i++)                     /* all vertices with no prerequisite */
        if (indeg[i] == 0) queue[++rear] = i;

    printf("\nTopological order: ");
    while (front <= rear) {
        u = queue[front++];
        printf("%c ", 'A' + u);
        count++;
        for (v = 0; v < n; v++)
            if (adj[u][v]) {
                indeg[v]--;                     /* remove edge u -> v */
                if (indeg[v] == 0) queue[++rear] = v;
            }
    }
    if (count < n) printf("\nThe graph has a cycle - no topological order.");
    printf("\n");
    return 0;
}
