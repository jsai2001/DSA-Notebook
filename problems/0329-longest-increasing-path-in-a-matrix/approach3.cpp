#include <algorithm>
#include <vector>
class Solution {
public:
    int longestIncreasingPath(std::vector<std::vector<int>>& matrix) {
        m = &matrix; // @viz init
        memo.assign(matrix.size(), std::vector<int>(matrix[0].size(), 0)); // 0 = not worked out yet // @viz init
        int ans = 0; // @viz return
        for (int r = 0; r < (int)matrix.size(); ++r) // @viz return
            for (int c = 0; c < (int)matrix[0].size(); ++c) ans = std::max(ans, longest(r, c)); // @viz return
        return ans; // @viz return
    }
private:
    std::vector<std::vector<int>>* m;
    std::vector<std::vector<int>> memo;
    int longest(int r, int c) { // the longest increasing path starting here // @viz call
        if (memo[r][c]) return memo[r][c]; // @viz memo
        auto& g = *m; // @viz call
        int best = 1; // @viz call
        const int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1}; // @viz step
        for (int d = 0; d < 4; ++d) { // @viz step
            int x = r + dr[d], y = c + dc[d]; // @viz step
            if (x >= 0 && x < (int)g.size() && y >= 0 && y < (int)g[0].size() && g[x][y] > g[r][c]) best = std::max(best, 1 + longest(x, y)); // strictly bigger, so no cycles // @viz step
        }
        return memo[r][c] = best; // @viz store
    }
};
