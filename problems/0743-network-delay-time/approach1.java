import java.util.*;
class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        final int INF = Integer.MAX_VALUE / 2; // @viz init
        int[] dist = new int[n + 1]; // dist[v] = the fastest time to v found so far // @viz init
        Arrays.fill(dist, INF); // @viz init
        dist[k] = 0; // @viz init
        for (int round = 0; round < n - 1; round++) { // a shortest path has at most n - 1 edges // @viz round
            boolean changed = false; // @viz round
            for (int[] e : times) { // try every edge // @viz relax
                if (dist[e[0]] + e[2] < dist[e[1]]) { // going through e[0] is faster // @viz relax
                    dist[e[1]] = dist[e[0]] + e[2]; // @viz relax
                    changed = true; // @viz relax
                }
            }
            if (!changed) break; // nothing improved: it's final // @viz stop
        }
        int best = 0; // @viz return
        for (int v = 1; v <= n; v++) best = Math.max(best, dist[v]); // the signal reaches everyone when the slowest node gets it // @viz return
        return best == INF ? -1 : best; // @viz return
    }
}
