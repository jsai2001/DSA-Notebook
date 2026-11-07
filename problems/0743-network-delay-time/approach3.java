import java.util.*;
class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        final int INF = Integer.MAX_VALUE / 2; // @viz init
        int[][] w = new int[n + 1][n + 1]; // w[u][v] = the edge time, as a table // @viz init
        for (int[] row : w) Arrays.fill(row, INF); // @viz init
        for (int[] e : times) w[e[0]][e[1]] = e[2]; // @viz init
        int[] dist = new int[n + 1]; // @viz init
        Arrays.fill(dist, INF); // @viz init
        boolean[] done = new boolean[n + 1]; // @viz init
        dist[k] = 0; // @viz init
        for (int round = 0; round < n; round++) { // @viz pick
            int u = -1; // @viz pick
            for (int v = 1; v <= n; v++) // the closest node not finished yet // @viz pick
                if (!done[v] && (u < 0 || dist[v] < dist[u])) u = v; // @viz pick
            if (dist[u] == INF) return -1; // the rest can't be reached // @viz stuck
            done[u] = true; // its time is final // @viz pick
            for (int v = 1; v <= n; v++) // update its neighbours // @viz relax
                dist[v] = Math.min(dist[v], dist[u] + w[u][v]); // @viz relax
        }
        int best = 0; // @viz return
        for (int v = 1; v <= n; v++) best = Math.max(best, dist[v]); // @viz return
        return best; // @viz return
    }
}
