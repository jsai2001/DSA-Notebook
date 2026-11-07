#include <climits>
#include <queue>
#include <utility>
#include <vector>
class Solution {
public:
    int findCheapestPrice(int n, std::vector<std::vector<int>>& flights, int src, int dst, int k) {
        std::vector<std::vector<std::pair<int, int>>> out(n); // out[u] = (v, price) for each flight from u // @viz init
        for (auto& f : flights) out[f[0]].push_back({f[1], f[2]}); // @viz init
        std::vector<int> best(n, INT_MAX); // the cheapest price found to each city so far // @viz init
        best[src] = 0; // @viz init
        std::queue<std::pair<int, int>> queue; // (city, price paid), one level per flight taken // @viz init
        queue.push({src, 0}); // @viz init
        for (int level = 0; level <= k && !queue.empty(); ++level) { // at most k stops = at most k + 1 flights // @viz level
            for (int size = queue.size(); size > 0; --size) { // @viz level
                auto [u, cost] = queue.front(); // @viz fly
                queue.pop(); // @viz fly
                for (auto [v, p] : out[u]) // @viz fly
                    if (cost + p < best[v]) { // only keep going if this is cheaper than any way found before // @viz fly
                        best[v] = cost + p; // @viz fly
                        queue.push({v, cost + p}); // @viz fly
                    }
            }
        }
        return best[dst] == INT_MAX ? -1 : best[dst]; // @viz return
    }
};
