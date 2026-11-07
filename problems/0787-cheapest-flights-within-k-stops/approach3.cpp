#include <climits>
#include <vector>
class Solution {
public:
    int findCheapestPrice(int n, std::vector<std::vector<int>>& flights, int src, int dst, int k) {
        const int INF = INT_MAX / 2; // @viz init
        std::vector<int> price(n, INF); // price[v] = the cheapest way to v using at most `round` flights // @viz init
        price[src] = 0; // @viz init
        for (int round = 0; round <= k; ++round) { // k stops = k + 1 flights: one round per flight // @viz round
            std::vector<int> next = price; // read last round's prices only, so one round adds at most one flight // @viz round
            bool changed = false; // @viz round
            for (auto& f : flights) // @viz relax
                if (price[f[0]] + f[2] < next[f[1]]) { // @viz relax
                    next[f[1]] = price[f[0]] + f[2]; // @viz relax
                    changed = true; // @viz relax
                }
            if (!changed) break; // nothing got cheaper: more rounds won't help // @viz stop
            price.swap(next); // @viz round
        }
        return price[dst] >= INF ? -1 : price[dst]; // @viz return
    }
};
