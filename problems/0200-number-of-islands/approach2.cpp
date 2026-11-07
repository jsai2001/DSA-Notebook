#include <numeric>
#include <vector>
class Solution {
public:
    int numIslands(std::vector<std::vector<char>>& grid) {
        const int R = grid.size(), C = grid[0].size(); // @viz init
        parent.resize(R * C); // @viz init
        std::iota(parent.begin(), parent.end(), 0); // cell r * C + c starts as its own group // @viz init
        int count = 0; // @viz init
        for (auto& row : grid) for (char ch : row) count += ch == '1'; // every land cell starts as its own island // @viz init
        for (int r = 0; r < R; ++r) { // @viz cell
            for (int c = 0; c < C; ++c) { // @viz cell
                if (grid[r][c] != '1') continue; // @viz cell
                const int nb[2][2] = {{r + 1, c}, {r, c + 1}}; // down and right are enough: each pair is met once // @viz pair
                for (auto& p : nb) { // @viz pair
                    if (p[0] < R && p[1] < C && grid[p[0]][p[1]] == '1') { // @viz pair
                        int a = find(r * C + c), b = find(p[0] * C + p[1]); // @viz pair
                        if (a != b) { // two separate islands touch: they are one // @viz join
                            parent[a] = b; // @viz join
                            --count; // @viz join
                        }
                    }
                }
            }
        }
        return count; // @viz return
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
