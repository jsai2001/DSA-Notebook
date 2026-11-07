#include <vector>
class Solution {
    std::vector<char> reach(const std::vector<std::vector<int>>& h, std::vector<int> q) { // every cell that drains into the starts in q // @viz init
        int m = h.size(), n = h[0].size(); // @viz seed
        std::vector<char> seen(m * n, 0); // @viz seed
        for (int cell : q) seen[cell] = 1; // @viz seed
        int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1}; // @viz seed
        for (size_t k = 0; k < q.size(); ++k) { // BFS uphill: water flows back down the same way // @viz bfs
            int i = q[k] / n, j = q[k] % n; // @viz bfs
            for (int d = 0; d < 4; ++d) { // @viz bfs
                int x = i + dr[d], y = j + dc[d]; // @viz bfs
                if (x >= 0 && x < m && y >= 0 && y < n && !seen[x * n + y] && h[x][y] >= h[i][j]) { // @viz bfs
                    seen[x * n + y] = 1; // @viz bfs
                    q.push_back(x * n + y); // @viz bfs
                }
            }
        }
        return seen; // @viz bfs
    }
public:
    std::vector<std::vector<int>> pacificAtlantic(std::vector<std::vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size(); // @viz init
        std::vector<int> p, a; // @viz seed
        for (int c = 0; c < n; ++c) { p.push_back(c); a.push_back((m - 1) * n + c); } // top: Pacific, bottom: Atlantic // @viz seed
        for (int r = 0; r < m; ++r) { p.push_back(r * n); a.push_back(r * n + n - 1); } // left: Pacific, right: Atlantic // @viz seed
        auto pac = reach(heights, p), atl = reach(heights, a); // @viz seed
        std::vector<std::vector<int>> ans; // @viz return
        for (int r = 0; r < m; ++r) // @viz return
            for (int c = 0; c < n; ++c) // @viz return
                if (pac[r * n + c] && atl[r * n + c]) ans.push_back({r, c}); // @viz return
        return ans; // @viz return
    }
};
