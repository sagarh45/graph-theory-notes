/* Adjacency list using linked lists (new node added at the end) */
#include <stdio.h>
#include <stdlib.h>
#define MAX 20

struct node {
    int vertex;
    struct node *next;
};

struct node *head[MAX];
int n;

void addEdge(int u, int v) {
    struct node *p, *nn = (struct node *)malloc(sizeof(struct node));
    nn->vertex = v;
    nn->next = NULL;
    if (head[u] == NULL) {
        head[u] = nn;
        return;
    }
    p = head[u];
    while (p->next != NULL) p = p->next;
    p->next = nn;
}

void display() {
    int i;
    struct node *p;
    printf("\nAdjacency list:\n");
    for (i = 0; i < n; i++) {
        printf(" %c", 'A' + i);
        for (p = head[i]; p != NULL; p = p->next)
            printf(" -> %c", 'A' + p->vertex);
        printf(" -> NULL\n");
    }
}

int main() {
    int e, i, directed;
    char u, v;
    printf("Number of vertices: ");
    scanf("%d", &n);
    printf("Directed? (1 = yes, 0 = no): ");
    scanf("%d", &directed);
    printf("Number of edges: ");
    scanf("%d", &e);
    for (i = 0; i < e; i++) {
        printf("Edge %d (e.g. A B): ", i + 1);
        scanf(" %c %c", &u, &v);
        addEdge(u - 'A', v - 'A');
        if (!directed) addEdge(v - 'A', u - 'A');
    }
    display();
    return 0;
}
