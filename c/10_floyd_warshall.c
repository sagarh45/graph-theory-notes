/* Floyd-Warshall: shortest distance between every pair, O(V^3) */
#include <stdio.h>
#define MAX 20
#define INF 99999

int D[MAX][MAX];
int n;

void printMatrix(const char *title) {
    int i, j;
    printf("\n%s\n    ", title);
    for (j = 0; j < n; j++) printf("%4c", 'A' + j);
    printf("\n");
    for (i = 0; i < n; i++) {
        printf("%c : ", 'A' + i);
        for (j = 0; j < n; j++) {
            if (D[i][j] >= INF) printf("   -");
            else printf("%4d", D[i][j]);
        }
        printf("\n");
    }
}

void floyd() {
    int i, j, k;
    for (k = 0; k < n; k++)                 /* allow vertex k as a middle stop */
        for (i = 0; i < n; i++)
            for (j = 0; j < n; j++)
                if (D[i][k] < INF && D[k][j] < INF && D[i][k] + D[k][j] < D[i][j])
                    D[i][j] = D[i][k] + D[k][j];
}

int main() {
    int e, i, j, w;
    char u, v;
    printf("Number of vertices: ");
    scanf("%d", &n);
    for (i = 0; i < n; i++)
        for (j = 0; j < n; j++)
            D[i][j] = (i == j) ? 0 : INF;
    printf("Number of directed edges: ");
    scanf("%d", &e);
    for (i = 0; i < e; i++) {
        printf("Edge %d (u v weight): ", i + 1);
        scanf(" %c %c %d", &u, &v, &w);
        D[u - 'A'][v - 'A'] = w;
    }
    printMatrix("Initial matrix D0 (- = no edge):");
    floyd();
    printMatrix("Shortest distances:");
    return 0;
}
