#include <algorithm>
#include <cstdlib>
#include <numeric>
#include <tuple>
#include <vector>
class Solution {
public:
    int minCostConnectPoints(std::vector<std::vector<int>>& points) {
        const int n = points.size(); // @viz init
        std::vector<std::tuple<int, int, int>> edges; // every pair of points is an edge // @viz edges
        edges.reserve(static_cast<size_t>(n) * (n - 1) / 2); // @viz edges
        for (int i = 0; i < n; ++i) { // @viz edges
            for (int j = i + 1; j < n; ++j) { // @viz edges
                int d = std::abs(points[i][0] - points[j][0]) + std::abs(points[i][1] - points[j][1]); // @viz edges
                edges.emplace_back(d, i, j); // @viz edges
            }
        }
        std::sort(edges.begin(), edges.end()); // cheapest first // @viz sort
        parent.resize(n); // @viz sort
        std::iota(parent.begin(), parent.end(), 0); // union-find: which group each point is in // @viz sort
        int total = 0, used = 0; // the answer fits in int (given) // @viz sort
        for (auto [d, i, j] : edges) { // @viz try
            int ri = find(i), rj = find(j); // @viz try
            if (ri == rj) continue; // already connected: this edge would make a cycle // @viz skip
            parent[ri] = rj; // join the two groups // @viz take
            total += d; // @viz take
            if (++used == n - 1) break; // a tree on n points has n - 1 edges // @viz take, done
        }
        return total; // @viz return
    }

private:
    std::vector<int> parent;
    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]]; // path halving
            x = parent[x];
        }
        return x;
    }
};
