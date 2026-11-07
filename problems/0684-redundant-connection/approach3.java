class Solution {
    private int[] parent;

    private int find(int x) { // the group's representative (root)
        while (parent[x] != x) {
            parent[x] = parent[parent[x]]; // path halving keeps the trees flat
            x = parent[x];
        }
        return x;
    }

    public int[] findRedundantConnection(int[][] edges) {
        parent = new int[edges.length + 1]; // @viz init
        for (int i = 0; i < parent.length; i++) parent[i] = i; // every node starts as its own group // @viz init
        for (int[] e : edges) { // @viz edge
            int ra = find(e[0]), rb = find(e[1]); // @viz edge
            if (ra == rb) return e; // already in one group: this edge closes a cycle // @viz found
            parent[ra] = rb; // join the groups (the roots, not a and b) // @viz union
        }
        return new int[0]; // not reached
    }
}
