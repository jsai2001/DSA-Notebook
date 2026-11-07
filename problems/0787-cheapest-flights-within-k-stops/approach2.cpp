#include <array>
#include <climits>
#include <functional>
#include <queue>
#include <utility>
#include <vector>
class Solution {
public:
    int findCheapestPrice(int n, std::vector<std::vector<int>>& flights, int src, int dst, int k) {
        std::vector<std::vector<std::pair<int, int>>> out(n); // @viz init
        for (auto& f : flights) out[f[0]].push_back({f[1], f[2]}); // @viz init
        std::vector<int> fewest(n, INT_MAX); // the fewest flights used by any popped route to each city // @viz init
        std::priority_queue<std::array<int, 3>, std::vector<std::array<int, 3>>, std::greater<>> heap; // (price, city, flights used), cheapest first // @viz init
        heap.push({0, src, 0}); // @viz init
        while (!heap.empty()) { // @viz pop
            auto [cost, u, used] = heap.top(); // @viz pop
            heap.pop(); // @viz pop
            if (u == dst) return cost; // the cheapest route that stays within k stops // @viz done
            if (used >= fewest[u] || used > k) continue; // a cheaper route got here with no more flights; or no flights left // @viz skip
            fewest[u] = used; // @viz push
            for (auto [v, p] : out[u]) heap.push({cost + p, v, used + 1}); // @viz push
        }
        return -1; // @viz none
    }
};
