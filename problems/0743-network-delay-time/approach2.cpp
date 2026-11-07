#include <algorithm>
#include <functional>
#include <queue>
#include <utility>
#include <vector>
class Solution {
public:
    int networkDelayTime(std::vector<std::vector<int>>& times, int n, int k) {
        std::vector<std::vector<std::pair<int, int>>> graph(n + 1); // graph[u] = (v, time) for each edge out of u // @viz init
        for (auto& e : times) graph[e[0]].push_back({e[1], e[2]}); // @viz init
        std::vector<int> dist(n + 1, -1); // final times; -1 = not reached yet // @viz init
        std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<>> heap; // (time, node), earliest first // @viz init
        heap.push({0, k}); // @viz init
        int reached = 0, best = 0; // @viz init
        while (!heap.empty()) { // @viz pop
            auto [d, u] = heap.top(); // @viz pop
            heap.pop(); // @viz pop
            if (dist[u] >= 0) continue; // an older, slower entry for a node already done // @viz stale
            dist[u] = d; // the earliest time u can get the signal // @viz done
            ++reached; // @viz done
            best = std::max(best, d); // @viz done
            for (auto [v, w] : graph[u]) // @viz push
                if (dist[v] < 0) heap.push({d + w, v}); // @viz push
        }
        return reached == n ? best : -1; // someone unreached: -1 // @viz return
    }
};
