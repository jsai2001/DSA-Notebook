import java.util.*;
class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        List<List<int[]>> out = new ArrayList<>(); // @viz init
        for (int i = 0; i < n; i++) out.add(new ArrayList<>()); // @viz init
        for (int[] f : flights) out.get(f[0]).add(new int[] {f[1], f[2]}); // @viz init
        int[] fewest = new int[n]; // the fewest flights used by any popped route to each city // @viz init
        Arrays.fill(fewest, Integer.MAX_VALUE); // @viz init
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]); // (price, city, flights used), cheapest first // @viz init
        heap.add(new int[] {0, src, 0}); // @viz init
        while (!heap.isEmpty()) { // @viz pop
            int[] top = heap.poll(); // @viz pop
            int cost = top[0], u = top[1], used = top[2]; // @viz pop
            if (u == dst) return cost; // the cheapest route that stays within k stops // @viz done
            if (used >= fewest[u] || used > k) continue; // a cheaper route got here with no more flights; or no flights left // @viz skip
            fewest[u] = used; // @viz push
            for (int[] e : out.get(u)) heap.add(new int[] {cost + e[1], e[0], used + 1}); // @viz push
        }
        return -1; // @viz none
    }
}
