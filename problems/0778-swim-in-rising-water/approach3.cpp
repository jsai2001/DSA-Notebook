#include <numeric>
#include <vector>
class Solution {
public:
    int swimInWater(std::vector<std::vector<int>>& grid) {
        const int n = grid.size(); // @viz init
        std::vector<int> where(n * n); // where[h] = the cell with height h (the heights are 0..n*n-1, each once) // @viz init
        for (int r = 0; r < n; ++r) // @viz init
            for (int c = 0; c < n; ++c) where[grid[r][c]] = r * n + c; // @viz init
        parent.resize(n * n); // union-find over the cells // @viz init
        std::iota(parent.begin(), parent.end(), 0); // @viz init
        const int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1}; // @viz init
        for (int t = 0; t < n * n; ++t) { // the water rises; at time t the cell of height t opens // @viz open
            int cell = where[t], r = cell / n, c = cell % n; // @viz open
            for (int d = 0; d < 4; ++d) { // join it with open neighbours // @viz join
                int x = r + dr[d], y = c + dc[d]; // @viz join
                if (x >= 0 && x < n && y >= 0 && y < n && grid[x][y] <= t) parent[find(x * n + y)] = find(cell); // @viz join
            }
            if (find(0) == find(n * n - 1)) return t; // the corners are connected now // @viz done
        }
        return -1; // not reached
    }
private:
    std::vector<int> parent;
    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]]; // path halving
            x = parent[x];
        }
        return x;
    }
};
