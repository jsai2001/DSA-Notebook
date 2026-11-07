import java.util.*;

class Solution {
    public int minCostConnectPoints(int[][] points) {
        int n = points.length; // @viz init
        int[] dist = new int[n]; // dist[v]: the cheapest edge from the tree to v so far // @viz init
        Arrays.fill(dist, Integer.MAX_VALUE); // @viz init
        dist[0] = 0; // start from point 0 // @viz init
        boolean[] inTree = new boolean[n]; // @viz init
        int total = 0; // @viz init
        for (int round = 0; round < n; round++) { // add one point per round // @viz pick
            int u = -1; // @viz pick
            for (int v = 0; v < n; v++) { // the closest point not in the tree: a scan, no heap // @viz pick
                if (!inTree[v] && (u == -1 || dist[v] < dist[u])) u = v; // @viz pick
            }
            inTree[u] = true; // @viz add
            total += dist[u]; // @viz add
            for (int v = 0; v < n; v++) { // u may now be a cheaper way to reach other points // @viz relax
                if (inTree[v]) continue; // @viz relax
                int d = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]); // @viz relax
                if (d < dist[v]) dist[v] = d; // @viz relax
            }
        }
        return total; // @viz return
    }
}
