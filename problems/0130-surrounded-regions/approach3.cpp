#include <numeric>
#include <vector>
class Solution {
public:
    void solve(std::vector<std::vector<char>>& board) {
        const int m = board.size(), n = board[0].size(); // @viz init
        parent.assign(m * n + 1, 0); // cell r * n + c, plus one extra node: "the border" // @viz init
        std::iota(parent.begin(), parent.end(), 0); // @viz init
        const int BORDER = m * n; // @viz init
        for (int r = 0; r < m; ++r) { // @viz loop
            for (int c = 0; c < n; ++c) { // @viz loop
                if (board[r][c] != 'O') continue; // @viz loop
                if (r == 0 || r == m - 1 || c == 0 || c == n - 1) { // @viz border
                    unite(r * n + c, BORDER); // @viz border
                }
                if (r + 1 < m && board[r + 1][c] == 'O') { // join with the O below // @viz join
                    unite(r * n + c, (r + 1) * n + c); // @viz join
                }
                if (c + 1 < n && board[r][c + 1] == 'O') { // and the O to the right // @viz join
                    unite(r * n + c, r * n + c + 1); // @viz join
                }
            }
        }
        const int border = find(BORDER); // @viz flip
        for (int r = 0; r < m; ++r) { // @viz flip
            for (int c = 0; c < n; ++c) { // @viz flip
                if (board[r][c] == 'O' && find(r * n + c) != border) { // @viz flip
                    board[r][c] = 'X'; // not in the border's group: trapped // @viz flip
                }
            }
        }
    }

private:
    std::vector<int> parent;
    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]]; // path halving keeps the trees flat
            x = parent[x];
        }
        return x;
    }
    void unite(int a, int b) { parent[find(a)] = find(b); }
};
