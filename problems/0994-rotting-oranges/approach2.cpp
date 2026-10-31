#include <queue>
#include <utility>
#include <vector>
class Solution {
public:
    int orangesRotting(std::vector<std::vector<int>>& grid) {
        int rows = grid.size(), cols = grid[0].size(); // @viz init
        std::queue<std::pair<int, int>> q; // @viz init
        int fresh = 0; // @viz init
        for (int r = 0; r < rows; ++r) { // @viz init
            for (int c = 0; c < cols; ++c) { // @viz init
                if (grid[r][c] == 2) q.push({r, c}); // every rotten orange starts at minute 0 // @viz init
                else if (grid[r][c] == 1) ++fresh; // @viz init
            }
        }
        int minutes = 0; // @viz init
        const int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1};
        while (!q.empty() && fresh > 0) { // stop as soon as nothing is fresh // @viz minute
            ++minutes; // @viz minute
            for (int size = q.size(); size > 0; --size) { // one BFS level = one minute // @viz minute
                auto [r, c] = q.front(); // @viz pop
                q.pop(); // @viz pop
                for (int k = 0; k < 4; ++k) { // @viz look
                    int nr = r + dr[k], nc = c + dc[k]; // @viz look
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) { // @viz look
                        grid[nr][nc] = 2; // rot it now so it's never queued twice // @viz rot
                        --fresh; // @viz rot
                        q.push({nr, nc}); // @viz rot
                    }
                }
            }
        }
        return fresh == 0 ? minutes : -1; // @viz return
    }
};
