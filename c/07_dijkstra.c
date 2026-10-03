/* Dijkstra's shortest paths, O(n^2) with an adjacency matrix */
#include <stdio.h>
#include <limits.h>
#define MAX 20

int cost[MAX][MAX];     /* 0 = no edge */
int n;

void printPath(int prev[], int v) {
    if (prev[v] != -1) {
        printPath(prev, prev[v]);
        printf(" -> ");
    }
    printf("%c", 'A' + v);
}

void dijkstra(int s) {
    int dist[MAX], prev[MAX], done[MAX];
    int i, k, u, v;
    for (i = 0; i < n; i++) {
        dist[i] = INT_MAX;
        prev[i] = -1;
        done[i] = 0;
    }
    dist[s] = 0;
    for (k = 0; k < n; k++) {
        u = -1;                                   /* unfinished vertex with smallest dist */
        for (i = 0; i < n; i++)
            if (!done[i] && dist[i] != INT_MAX && (u == -1 || dist[i] < dist[u]))
                u = i;
        if (u == -1) break;                       /* the rest are unreachable */
        done[u] = 1;
        for (v = 0; v < n; v++)                   /* relax every edge u -> v */
            if (cost[u][v] && !done[v] && dist[u] + cost[u][v] < dist[v]) {
                dist[v] = dist[u] + cost[u][v];
                prev[v] = u;
            }
    }
    printf("\nVertex  Distance  Path\n");
    for (i = 0; i < n; i++) {
        if (dist[i] == INT_MAX) { printf("  %c     unreachable\n", 'A' + i); continue; }
        printf("  %c     %4d      ", 'A' + i, dist[i]);
        printPath(prev, i);
        printf("\n");
    }
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
        cost[u - 'A'][v - 'A'] = cost[v - 'A'][u - 'A'] = w;   /* undirected */
    }
    printf("Source vertex: ");
    scanf(" %c", &s);
    dijkstra(s - 'A');
    return 0;
}
