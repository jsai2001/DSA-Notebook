#include <algorithm>
#include <vector>
class Solution {
public:
    int longestIncreasingPath(std::vector<std::vector<int>>& matrix) {
        m = &matrix; // @viz init
        int ans = 0; // @viz return
        for (int r = 0; r < (int)matrix.size(); ++r) // @viz return
            for (int c = 0; c < (int)matrix[0].size(); ++c) ans = std::max(ans, longest(r, c)); // @viz return
        return ans; // @viz return
    }
private:
    std::vector<std::vector<int>>* m;
    int longest(int r, int c) { // the longest increasing path starting here, worked out from scratch each time // @viz call
        auto& g = *m; // @viz call
        int best = 1; // @viz call
        const int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1}; // @viz step
        for (int d = 0; d < 4; ++d) { // @viz step
            int x = r + dr[d], y = c + dc[d]; // @viz step
            if (x >= 0 && x < (int)g.size() && y >= 0 && y < (int)g[0].size() && g[x][y] > g[r][c]) best = std::max(best, 1 + longest(x, y)); // @viz step
        }
        return best; // @viz call
    }
};
