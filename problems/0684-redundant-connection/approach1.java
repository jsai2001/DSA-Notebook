import java.util.*;

class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length; // n nodes, n edges: one edge too many for a tree // @viz init
        for (int skip = n - 1; skip >= 0; skip--) { // last edge first: the answer is the last one that works // @viz skip
            List<List<Integer>> adj = new ArrayList<>(); // @viz build
            for (int i = 0; i <= n; i++) adj.add(new ArrayList<>()); // @viz build
            for (int k = 0; k < n; k++) { // the graph without edge `skip` // @viz build
                if (k == skip) continue; // @viz build
                adj.get(edges[k][0]).add(edges[k][1]); // @viz build
                adj.get(edges[k][1]).add(edges[k][0]); // @viz build
            }
            boolean[] seen = new boolean[n + 1]; // @viz walk
            ArrayDeque<Integer> stack = new ArrayDeque<>(); // @viz walk
            stack.push(1); // @viz walk
            seen[1] = true; // @viz walk
            int count = 1; // @viz walk
            while (!stack.isEmpty()) { // can every node be reached from node 1? // @viz walk
                int u = stack.pop(); // @viz walk
                for (int v : adj.get(u)) { // @viz walk
                    if (!seen[v]) { // @viz walk
                        seen[v] = true; // @viz walk
                        count++; // @viz walk
                        stack.push(v); // @viz walk
                    }
                }
            }
            if (count == n) return edges[skip]; // connected with n - 1 edges: a tree // @viz found
        }
        return new int[0]; // not reached: one edge always works
    }
}
