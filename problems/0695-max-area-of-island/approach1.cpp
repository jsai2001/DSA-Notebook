#include <algorithm>
#include <utility>
#include <vector>
class Solution {
public:
    int maxAreaOfIsland(std::vector<std::vector<int>>& grid) {
        const int R = grid.size(), C = grid[0].size(); // @viz init
        const int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1}; // @viz init
        int best = 0; // @viz init
        for (int r = 0; r < R; ++r) { // @viz cell
            for (int c = 0; c < C; ++c) { // @viz cell
                if (grid[r][c] == 0) continue; // @viz cell
                std::vector<std::vector<char>> seen(R, std::vector<char>(C, 0)); // count this cell's island from scratch // @viz fill
                std::vector<std::pair<int, int>> stack{{r, c}}; // @viz fill
                seen[r][c] = 1; // @viz fill
                int size = 1; // @viz fill
                while (!stack.empty()) { // @viz fill
                    auto [i, j] = stack.back(); // @viz fill
                    stack.pop_back(); // @viz fill
                    for (int d = 0; d < 4; ++d) { // @viz fill
                        int x = i + dr[d], y = j + dc[d]; // @viz fill
                        if (x >= 0 && x < R && y >= 0 && y < C && grid[x][y] == 1 && !seen[x][y]) { // @viz fill
                            seen[x][y] = 1; // @viz fill
                            ++size; // @viz fill
                            stack.push_back({x, y}); // @viz fill
                        }
                    }
                }
                best = std::max(best, size); // @viz best
            }
        }
        return best; // @viz return
    }
};
