#include <algorithm>
#include <climits>
#include <vector>
class Solution {
public:
    int networkDelayTime(std::vector<std::vector<int>>& times, int n, int k) {
        const int INF = INT_MAX / 2; // @viz init
        std::vector<std::vector<int>> w(n + 1, std::vector<int>(n + 1, INF)); // w[u][v] = the edge time, as a table // @viz init
        for (auto& e : times) w[e[0]][e[1]] = e[2]; // @viz init
        std::vector<int> dist(n + 1, INF); // @viz init
        std::vector<char> done(n + 1, 0); // @viz init
        dist[k] = 0; // @viz init
        for (int round = 0; round < n; ++round) { // @viz pick
            int u = -1; // @viz pick
            for (int v = 1; v <= n; ++v) // the closest node not finished yet // @viz pick
                if (!done[v] && (u < 0 || dist[v] < dist[u])) u = v; // @viz pick
            if (dist[u] == INF) return -1; // the rest can't be reached // @viz stuck
            done[u] = 1; // its time is final // @viz pick
            for (int v = 1; v <= n; ++v) // update its neighbours // @viz relax
                dist[v] = std::min(dist[v], dist[u] + w[u][v]); // @viz relax
        }
        return *std::max_element(dist.begin() + 1, dist.end()); // @viz return
    }
};
