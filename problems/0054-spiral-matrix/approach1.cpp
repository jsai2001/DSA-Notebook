#include <vector>
class Solution {
public:
    std::vector<int> spiralOrder(std::vector<std::vector<int>>& matrix) {
        int m = (int)matrix.size(), n = (int)matrix[0].size();
        std::vector<std::vector<bool>> seen(m, std::vector<bool>(n, false)); // @viz init
        const int dr[4] = {0, 1, 0, -1}, dc[4] = {1, 0, -1, 0}; // right, down, left, up // @viz init
        int r = 0, c = 0, d = 0; // @viz init
        std::vector<int> result; // @viz init
        for (int k = 0; k < m * n; ++k) { // every cell exactly once // @viz take
            result.push_back(matrix[r][c]); // @viz take
            seen[r][c] = true; // @viz take
            int nr = r + dr[d], nc = c + dc[d]; // the next cell in this direction // @viz look
            if (nr < 0 || nr >= m || nc < 0 || nc >= n || seen[nr][nc]) { // off the edge, or already taken: turn right // @viz turn
                d = (d + 1) % 4; // @viz turn
                nr = r + dr[d]; // @viz turn
                nc = c + dc[d]; // @viz turn
            }
            r = nr; // @viz look
            c = nc; // @viz look
        }
        return result; // @viz return
    }
};
