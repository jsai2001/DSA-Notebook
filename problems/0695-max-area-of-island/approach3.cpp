#include <algorithm>
#include <utility>
#include <vector>
class Solution {
public:
    int maxAreaOfIsland(std::vector<std::vector<int>>& grid) {
        const int R = grid.size(), C = grid[0].size(); // @viz init
        const int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1}; // @viz init
        int best = 0; // @viz init
        std::vector<std::pair<int, int>> stack; // @viz init
        for (int r = 0; r < R; ++r) { // @viz cell
            for (int c = 0; c < C; ++c) { // @viz cell
                if (grid[r][c] == 0) continue; // @viz cell
                grid[r][c] = 0; // sink a cell when it's pushed, so it's never pushed twice // @viz start
                stack.push_back({r, c}); // @viz start
                int size = 0; // @viz start
                while (!stack.empty()) { // @viz pop
                    auto [i, j] = stack.back(); // @viz pop
                    stack.pop_back(); // @viz pop
                    ++size; // @viz pop
                    for (int d = 0; d < 4; ++d) { // @viz push
                        int x = i + dr[d], y = j + dc[d]; // @viz push
                        if (x >= 0 && x < R && y >= 0 && y < C && grid[x][y] == 1) { // @viz push
                            grid[x][y] = 0; // @viz push
                            stack.push_back({x, y}); // @viz push
                        }
                    }
                }
                best = std::max(best, size); // @viz best
            }
        }
        return best; // @viz return
    }
};
