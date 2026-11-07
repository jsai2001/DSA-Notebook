#include <utility>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> pacificAtlantic(std::vector<std::vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size(); // @viz init
        std::vector<std::vector<int>> ans; // @viz init
        std::vector<int> seen(m * n, -1); // seen[cell] = the start cell that reached it // @viz init
        int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1}; // @viz init
        for (int r = 0; r < m; ++r) // from every cell, follow the water downhill // @viz cell
            for (int c = 0; c < n; ++c) { // @viz cell
                bool pac = false, atl = false; // @viz cell
                int id = r * n + c; // @viz cell
                std::vector<std::pair<int, int>> stack = {{r, c}}; // @viz cell
                seen[id] = id; // @viz cell
                while (!stack.empty() && !(pac && atl)) { // @viz flow
                    auto [i, j] = stack.back(); // @viz flow
                    stack.pop_back(); // @viz flow
                    pac |= i == 0 || j == 0; // touches the top or left edge // @viz flow
                    atl |= i == m - 1 || j == n - 1; // touches the bottom or right edge // @viz flow
                    for (int d = 0; d < 4; ++d) { // @viz flow
                        int x = i + dr[d], y = j + dc[d]; // @viz flow
                        if (x >= 0 && x < m && y >= 0 && y < n && seen[x * n + y] != id && heights[x][y] <= heights[i][j]) { // water flows to equal or lower // @viz flow
                            seen[x * n + y] = id; // @viz flow
                            stack.push_back({x, y}); // @viz flow
                        }
                    }
                }
                if (pac && atl) ans.push_back({r, c}); // @viz both
            }
        return ans; // @viz return
    }
};
