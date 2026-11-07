#include <vector>
class Solution {
    int m, n;
    void climb(const std::vector<std::vector<int>>& h, int i, int j, std::vector<char>& seen) { // walk uphill from the ocean // @viz climb
        if (seen[i * n + j]) return; // @viz climb
        seen[i * n + j] = 1; // @viz climb
        int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1}; // @viz climb
        for (int d = 0; d < 4; ++d) { // @viz climb
            int x = i + dr[d], y = j + dc[d]; // @viz climb
            if (x >= 0 && x < m && y >= 0 && y < n && h[x][y] >= h[i][j]) climb(h, x, y, seen); // @viz climb
        }
    }
public:
    std::vector<std::vector<int>> pacificAtlantic(std::vector<std::vector<int>>& heights) {
        m = heights.size(); n = heights[0].size(); // @viz init
        std::vector<char> pac(m * n, 0), atl(m * n, 0); // cells whose water reaches each ocean // @viz init
        for (int c = 0; c < n; ++c) { climb(heights, 0, c, pac); climb(heights, m - 1, c, atl); } // top: Pacific, bottom: Atlantic // @viz edges
        for (int r = 0; r < m; ++r) { climb(heights, r, 0, pac); climb(heights, r, n - 1, atl); } // left: Pacific, right: Atlantic // @viz edges
        std::vector<std::vector<int>> ans; // @viz return
        for (int r = 0; r < m; ++r) // @viz return
            for (int c = 0; c < n; ++c) // @viz return
                if (pac[r * n + c] && atl[r * n + c]) ans.push_back({r, c}); // @viz return
        return ans; // @viz return
    }
};
