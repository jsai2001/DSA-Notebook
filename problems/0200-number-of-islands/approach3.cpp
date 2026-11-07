#include <queue>
#include <utility>
#include <vector>
class Solution {
public:
    int numIslands(std::vector<std::vector<char>>& grid) {
        const int R = grid.size(), C = grid[0].size(); // @viz init
        const int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1}; // @viz init
        int count = 0; // @viz init
        std::queue<std::pair<int, int>> queue; // @viz init
        for (int r = 0; r < R; ++r) { // @viz cell
            for (int c = 0; c < C; ++c) { // @viz cell
                if (grid[r][c] != '1') continue; // @viz cell
                ++count; // land not sunk yet: a new island // @viz start
                grid[r][c] = '0'; // sink a cell when it's queued, so it's never queued twice // @viz start
                queue.push({r, c}); // @viz start
                while (!queue.empty()) { // @viz pop
                    auto [i, j] = queue.front(); // @viz pop
                    queue.pop(); // @viz pop
                    for (int d = 0; d < 4; ++d) { // @viz push
                        int x = i + dr[d], y = j + dc[d]; // @viz push
                        if (x >= 0 && x < R && y >= 0 && y < C && grid[x][y] == '1') { // @viz push
                            grid[x][y] = '0'; // @viz push
                            queue.push({x, y}); // @viz push
                        }
                    }
                }
            }
        }
        return count; // @viz return
    }
};
