/* Greedy graph colouring (Welsh-Powell order: highest degree first) */
#include <stdio.h>
#define MAX 20

int adj[MAX][MAX], deg[MAX], order[MAX], color[MAX];
int n;

int main() {
    int e, i, j, k, c, used[MAX], maxc = 0;
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
    for (i = 0; i < n; i++) {
        deg[i] = 0;
        for (j = 0; j < n; j++) deg[i] += adj[i][j];
        order[i] = i;
        color[i] = -1;
    }
    for (i = 0; i < n - 1; i++)               /* sort by degree, largest first (stable) */
        for (j = 0; j < n - 1 - i; j++)
            if (deg[order[j]] < deg[order[j + 1]]) {
                int t = order[j]; order[j] = order[j + 1]; order[j + 1] = t;
            }
    printf("\nOrder:");
    for (i = 0; i < n; i++) printf(" %c(%d)", 'A' + order[i], deg[order[i]]);
    printf("\n");
    for (k = 0; k < n; k++) {
        int x = order[k];
        for (c = 0; c < n; c++) used[c] = 0;
        for (j = 0; j < n; j++)               /* colours taken by neighbours */
            if (adj[x][j] && color[j] != -1) used[color[j]] = 1;
        for (c = 0; used[c]; c++);            /* smallest free colour */
        color[x] = c;
        if (c + 1 > maxc) maxc = c + 1;
        printf("%c gets colour %d\n", 'A' + x, c + 1);
    }
    printf("Colours used = %d\n", maxc);
    return 0;
}
