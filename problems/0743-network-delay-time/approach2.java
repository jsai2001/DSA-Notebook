import java.util.*;
class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        List<List<int[]>> graph = new ArrayList<>(); // graph[u] = (v, time) for each edge out of u // @viz init
        for (int i = 0; i <= n; i++) graph.add(new ArrayList<>()); // @viz init
        for (int[] e : times) graph.get(e[0]).add(new int[] {e[1], e[2]}); // @viz init
        int[] dist = new int[n + 1]; // final times; -1 = not reached yet // @viz init
        Arrays.fill(dist, -1); // @viz init
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]); // (time, node), earliest first // @viz init
        heap.add(new int[] {0, k}); // @viz init
        int reached = 0, best = 0; // @viz init
        while (!heap.isEmpty()) { // @viz pop
            int[] top = heap.poll(); // @viz pop
            int d = top[0], u = top[1]; // @viz pop
            if (dist[u] >= 0) continue; // an older, slower entry for a node already done // @viz stale
            dist[u] = d; // the earliest time u can get the signal // @viz done
            reached++; // @viz done
            best = Math.max(best, d); // @viz done
            for (int[] e : graph.get(u)) // @viz push
                if (dist[e[0]] < 0) heap.add(new int[] {d + e[1], e[0]}); // @viz push
        }
        return reached == n ? best : -1; // someone unreached: -1 // @viz return
    }
}
