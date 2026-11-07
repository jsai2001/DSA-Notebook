#include <utility>
#include <vector>
class Solution {
public:
    int swimInWater(std::vector<std::vector<int>>& grid) {
        const int n = grid.size(); // @viz init
        int lo = grid[0][0], hi = n * n - 1; // the answer is somewhere in here // @viz init
        while (lo < hi) { // find the smallest t that works // @viz search
            int mid = (lo + hi) / 2; // @viz search
            if (can(grid, mid)) hi = mid; // works: maybe something smaller does too // @viz yes
            else lo = mid + 1; // too early // @viz no
        }
        return lo; // @viz return
    }
private:
    bool can(const std::vector<std::vector<int>>& grid, int t) { // at time t, can you reach the far corner using only cells <= t? // @viz test
        const int n = grid.size(); // @viz test
        if (grid[0][0] > t) return false; // @viz test
        std::vector<std::vector<char>> seen(n, std::vector<char>(n, 0)); // @viz test
        std::vector<std::pair<int, int>> stack{{0, 0}}; // @viz test
        seen[0][0] = 1; // @viz test
        const int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1}; // @viz test
        while (!stack.empty()) { // @viz test
            auto [r, c] = stack.back(); // @viz test
            stack.pop_back(); // @viz test
            if (r == n - 1 && c == n - 1) return true; // @viz test
            for (int d = 0; d < 4; ++d) { // @viz test
                int x = r + dr[d], y = c + dc[d]; // @viz test
                if (x >= 0 && x < n && y >= 0 && y < n && !seen[x][y] && grid[x][y] <= t) { // @viz test
                    seen[x][y] = 1; // @viz test
                    stack.push_back({x, y}); // @viz test
                }
            }
        }
        return false; // @viz test
    }
};
