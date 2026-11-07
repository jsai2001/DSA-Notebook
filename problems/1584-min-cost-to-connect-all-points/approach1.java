import java.util.*;

class Solution {
    private int[] parent;

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]]; // path halving
            x = parent[x];
        }
        return x;
    }

    public int minCostConnectPoints(int[][] points) {
        int n = points.length; // @viz init
        int m = n * (n - 1) / 2; // every pair of points is an edge // @viz edges
        long[] edges = new long[m]; // packed: distance * 2^20 + i * 2^10 + j, so a plain sort orders by distance // @viz edges
        int k = 0; // @viz edges
        for (int i = 0; i < n; i++) { // @viz edges
            for (int j = i + 1; j < n; j++) { // @viz edges
                long d = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]); // @viz edges
                edges[k++] = (d << 20) | ((long) i << 10) | j; // @viz edges
            }
        }
        Arrays.sort(edges); // cheapest first // @viz sort
        parent = new int[n]; // @viz sort
        for (int i = 0; i < n; i++) parent[i] = i; // union-find: which group each point is in // @viz sort
        int total = 0, used = 0; // @viz sort
        for (long e : edges) { // @viz try
            int i = (int) ((e >> 10) & 1023), j = (int) (e & 1023); // @viz try
            int ri = find(i), rj = find(j); // @viz try
            if (ri == rj) continue; // already connected: this edge would make a cycle // @viz skip
            parent[ri] = rj; // join the two groups // @viz take
            total += (int) (e >> 20); // @viz take
            if (++used == n - 1) break; // a tree on n points has n - 1 edges // @viz take, done
        }
        return total; // @viz return
    }
}
