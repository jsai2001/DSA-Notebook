import java.util.*;
class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        final int INF = Integer.MAX_VALUE / 2; // @viz init
        int[] price = new int[n]; // price[v] = the cheapest way to v using at most `round` flights // @viz init
        Arrays.fill(price, INF); // @viz init
        price[src] = 0; // @viz init
        for (int round = 0; round <= k; round++) { // k stops = k + 1 flights: one round per flight // @viz round
            int[] next = price.clone(); // read last round's prices only, so one round adds at most one flight // @viz round
            boolean changed = false; // @viz round
            for (int[] f : flights) // @viz relax
                if (price[f[0]] + f[2] < next[f[1]]) { // @viz relax
                    next[f[1]] = price[f[0]] + f[2]; // @viz relax
                    changed = true; // @viz relax
                }
            if (!changed) break; // nothing got cheaper: more rounds won't help // @viz stop
            price = next; // @viz round
        }
        return price[dst] >= INF ? -1 : price[dst]; // @viz return
    }
}
