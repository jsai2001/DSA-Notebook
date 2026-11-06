#include <utility>
#include <vector>
class Solution {
public:
    void solve(std::vector<std::vector<char>>& board) {
        const int m = board.size(), n = board[0].size(); // @viz init
        std::vector<std::pair<int, int>> trapped; // @viz init
        for (int r = 0; r < m; ++r) { // @viz loop
            for (int c = 0; c < n; ++c) { // @viz loop
                if (board[r][c] == 'O' && !escapes(board, r, c)) { // @viz loop
                    trapped.push_back({r, c}); // @viz trapped
                }
            }
        }
        for (auto [r, c] : trapped) { // flip after all the checks // @viz flip
            board[r][c] = 'X'; // @viz flip
        }
    }

private:
    // Can this O reach the border through other O's? A fresh search for every cell.
    static bool escapes(const std::vector<std::vector<char>>& board, int r, int c) {
        const int m = board.size(), n = board[0].size();
        std::vector<std::vector<char>> seen(m, std::vector<char>(n, 0)); // @viz search
        std::vector<std::pair<int, int>> stack{{r, c}}; // @viz search
        seen[r][c] = 1; // @viz search
        const int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1};
        while (!stack.empty()) { // @viz search
            auto [i, j] = stack.back(); // @viz search
            stack.pop_back(); // @viz search
            if (i == 0 || i == m - 1 || j == 0 || j == n - 1) { // @viz border
                return true; // @viz border
            }
            for (int k = 0; k < 4; ++k) { // @viz search
                int a = i + dr[k], b = j + dc[k]; // @viz search
                if (board[a][b] == 'O' && !seen[a][b]) { // @viz search
                    seen[a][b] = 1; // @viz search
                    stack.push_back({a, b}); // @viz search
                }
            }
        }
        return false; // @viz trapped
    }
};
