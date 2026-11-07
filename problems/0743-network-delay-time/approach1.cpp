#include <algorithm>
#include <climits>
#include <vector>
class Solution {
public:
    int networkDelayTime(std::vector<std::vector<int>>& times, int n, int k) {
        const int INF = INT_MAX / 2; // @viz init
        std::vector<int> dist(n + 1, INF); // dist[v] = the fastest time to v found so far // @viz init
        dist[k] = 0; // @viz init
        for (int round = 0; round < n - 1; ++round) { // a shortest path has at most n - 1 edges // @viz round
            bool changed = false; // @viz round
            for (auto& e : times) { // try every edge // @viz relax
                if (dist[e[0]] + e[2] < dist[e[1]]) { // going through e[0] is faster // @viz relax
                    dist[e[1]] = dist[e[0]] + e[2]; // @viz relax
                    changed = true; // @viz relax
                }
            }
            if (!changed) break; // nothing improved: it's final // @viz stop
        }
        int best = *std::max_element(dist.begin() + 1, dist.end()); // the signal reaches everyone when the slowest node gets it // @viz return
        return best == INF ? -1 : best; // @viz return
    }
};
