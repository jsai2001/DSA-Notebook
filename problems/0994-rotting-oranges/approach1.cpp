#include <utility>
#include <vector>
class Solution {
public:
    int orangesRotting(std::vector<std::vector<int>>& grid) {
        int rows = grid.size(), cols = grid[0].size(); // @viz init
        int minutes = 0; // @viz init
        const int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1};
        while (true) { // @viz minute
            // Find every fresh orange next to a rotten one, using this minute's grid only.
            std::vector<std::pair<int, int>> toRot; // @viz scan
            for (int r = 0; r < rows; ++r) { // @viz scan
                for (int c = 0; c < cols; ++c) { // @viz scan
                    if (grid[r][c] != 1) continue; // @viz scan
                    for (int k = 0; k < 4; ++k) { // @viz scan
                        int nr = r + dr[k], nc = c + dc[k];
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 2) { // @viz scan
                            toRot.push_back({r, c}); // @viz found
                            break;
                        }
                    }
                }
            }
            if (toRot.empty()) break; // @viz stop
            for (auto [r, c] : toRot) grid[r][c] = 2; // rot them all at once, after the scan // @viz rot
            ++minutes; // @viz rot
        }
        // Anything still fresh can never be reached.
        for (auto& row : grid) // @viz check
            for (int v : row) // @viz check
                if (v == 1) return -1; // @viz check
        return minutes; // @viz return
    }
};
