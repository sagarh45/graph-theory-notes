/* Breadth First Search on an adjacency matrix */
#include <stdio.h>
#define MAX 20

int adj[MAX][MAX], visited[MAX];
int queue[MAX], front = 0, rear = -1;
int n;

void enqueue(int v) { queue[++rear] = v; }
int  dequeue()      { return queue[front++]; }
int  isEmpty()      { return front > rear; }

void bfs(int start) {
    int u, v;
    visited[start] = 1;
    enqueue(start);
    while (!isEmpty()) {
        u = dequeue();
        printf("%c ", 'A' + u);
        for (v = 0; v < n; v++) {          /* neighbours in order A, B, C ... */
            if (adj[u][v] == 1 && !visited[v]) {
                visited[v] = 1;            /* mark when enqueued, not when printed */
                enqueue(v);
            }
        }
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
    printf("\nBFS order: ");
    bfs(s - 'A');
    printf("\n");
    return 0;
}
