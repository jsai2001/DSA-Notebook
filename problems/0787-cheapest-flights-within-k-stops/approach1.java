import java.util.*;
class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        List<List<int[]>> out = new ArrayList<>(); // out[u] = (v, price) for each flight from u // @viz init
        for (int i = 0; i < n; i++) out.add(new ArrayList<>()); // @viz init
        for (int[] f : flights) out.get(f[0]).add(new int[] {f[1], f[2]}); // @viz init
        int[] best = new int[n]; // the cheapest price found to each city so far // @viz init
        Arrays.fill(best, Integer.MAX_VALUE); // @viz init
        best[src] = 0; // @viz init
        ArrayDeque<int[]> queue = new ArrayDeque<>(); // (city, price paid), one level per flight taken // @viz init
        queue.add(new int[] {src, 0}); // @viz init
        for (int level = 0; level <= k && !queue.isEmpty(); level++) { // at most k stops = at most k + 1 flights // @viz level
            for (int size = queue.size(); size > 0; size--) { // @viz level
                int[] cur = queue.poll(); // @viz fly
                for (int[] e : out.get(cur[0])) // @viz fly
                    if (cur[1] + e[1] < best[e[0]]) { // only keep going if this is cheaper than any way found before // @viz fly
                        best[e[0]] = cur[1] + e[1]; // @viz fly
                        queue.add(new int[] {e[0], cur[1] + e[1]}); // @viz fly
                    }
            }
        }
        return best[dst] == Integer.MAX_VALUE ? -1 : best[dst]; // @viz return
    }
}
