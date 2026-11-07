#include <cstdlib>
#include <functional>
#include <queue>
#include <utility>
#include <vector>
class Solution {
public:
    int minCostConnectPoints(std::vector<std::vector<int>>& points) {
        const int n = points.size(); // @viz init
        std::vector<char> inTree(n, 0); // @viz init
        // (cost to attach, point), cheapest on top; start from point 0
        std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<>> heap; // @viz init
        heap.push({0, 0}); // @viz init
        int total = 0, added = 0; // @viz init
        while (added < n) { // @viz pop
            auto [d, u] = heap.top(); // the cheapest way to attach a new point // @viz pop
            heap.pop(); // @viz pop
            if (inTree[u]) continue; // an old, more expensive entry for a point already attached // @viz stale
            inTree[u] = 1; // @viz add
            total += d; // @viz add
            ++added; // @viz add
            for (int v = 0; v < n; ++v) { // offer every point outside the tree an edge from u // @viz push
                if (!inTree[v]) { // @viz push
                    heap.push({std::abs(points[u][0] - points[v][0]) + std::abs(points[u][1] - points[v][1]), v}); // @viz push
                }
            }
        }
        return total; // @viz return
    }
};
