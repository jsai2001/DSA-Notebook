#include <queue>
#include <utility>
#include <vector>
class Solution {
public:
    void solve(std::vector<std::vector<char>>& board) {
        const int m = board.size(), n = board[0].size(); // @viz init
        std::queue<std::pair<int, int>> q; // @viz init
        for (int r = 0; r < m; ++r) { // @viz seed
            for (int c = 0; c < n; ++c) { // @viz seed
                if ((r == 0 || r == m - 1 || c == 0 || c == n - 1) && board[r][c] == 'O') { // @viz seed
                    board[r][c] = 'S'; // safe: it touches the border // @viz seed
                    q.push({r, c}); // @viz seed
                }
            }
        }
        const int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1};
        while (!q.empty()) { // spread "safe" to every O connected to the border // @viz pop
            auto [r, c] = q.front(); // @viz pop
            q.pop(); // @viz pop
            for (int k = 0; k < 4; ++k) { // @viz spread
                int a = r + dr[k], b = c + dc[k]; // @viz spread
                if (a >= 0 && a < m && b >= 0 && b < n && board[a][b] == 'O') { // @viz spread
                    board[a][b] = 'S'; // mark when queued, so it's queued once // @viz spread
                    q.push({a, b}); // @viz spread
                }
            }
        }
        for (auto& row : board) { // @viz flip
            for (char& ch : row) { // @viz flip
                ch = ch == 'S' ? 'O' : 'X'; // O left over = trapped // @viz flip
            }
        }
    }
};
