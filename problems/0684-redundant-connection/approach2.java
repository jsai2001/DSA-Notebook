import java.util.*;

class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length; // @viz init
        List<List<Integer>> adj = new ArrayList<>(); // the graph so far // @viz init
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>()); // @viz init
        for (int[] e : edges) { // add the edges in order // @viz edge
            int a = e[0], b = e[1]; // @viz edge
            boolean[] seen = new boolean[n + 1]; // before adding a-b: is b already reachable from a? // @viz search
            ArrayDeque<Integer> stack = new ArrayDeque<>(); // @viz search
            stack.push(a); // @viz search
            seen[a] = true; // @viz search
            while (!stack.isEmpty()) { // @viz search
                int u = stack.pop(); // @viz search
                for (int v : adj.get(u)) { // @viz search
                    if (!seen[v]) { // @viz search
                        seen[v] = true; // @viz search
                        stack.push(v); // @viz search
                    }
                }
            }
            if (seen[b]) return e; // yes: a-b would close a cycle, and it's the last edge of that cycle // @viz found
            adj.get(a).add(b); // @viz add
            adj.get(b).add(a); // @viz add
        }
        return new int[0]; // not reached
    }
}
