#include <algorithm>
#include <array>
#include <functional>
#include <queue>
#include <vector>
class Solution {
public:
    int swimInWater(std::vector<std::vector<int>>& grid) {
        const int n = grid.size(); // @viz init
        std::priority_queue<std::array<int, 3>, std::vector<std::array<int, 3>>, std::greater<>> heap; // (the highest cell on the way here, r, c), lowest first // @viz init
        std::vector<std::vector<char>> seen(n, std::vector<char>(n, 0)); // @viz init
        heap.push({grid[0][0], 0, 0}); // @viz init
        seen[0][0] = 1; // @viz init
        const int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1}; // @viz init
        while (true) { // @viz pop
            auto [t, r, c] = heap.top(); // the cell reachable soonest // @viz pop
            heap.pop(); // @viz pop
            if (r == n - 1 && c == n - 1) return t; // @viz done
            for (int d = 0; d < 4; ++d) { // @viz push
                int x = r + dr[d], y = c + dc[d]; // @viz push
                if (x >= 0 && x < n && y >= 0 && y < n && !seen[x][y]) { // @viz push
                    seen[x][y] = 1; // @viz push
                    heap.push({std::max(t, grid[x][y]), x, y}); // you wait for the higher of the path and the cell // @viz push
                }
            }
        }
    }
};
