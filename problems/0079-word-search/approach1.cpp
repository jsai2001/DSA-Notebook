#include <string>
#include <vector>
class Solution {
public:
    bool exist(std::vector<std::vector<char>>& board, std::string word) {
        R = (int)board.size(); // @viz init
        C = (int)board[0].size(); // @viz init
        seen.assign(R, std::vector<bool>(C, false)); // cells on the current path // @viz init
        for (int r = 0; r < R; ++r) // try every cell as the first letter // @viz start
            for (int c = 0; c < C; ++c) // @viz start
                if (dfs(board, word, r, c, 0)) return true; // @viz start, return
        return false; // @viz return
    }
private:
    int R = 0, C = 0;
    std::vector<std::vector<bool>> seen;
    // Can word[k..] be spelled starting at (r, c)?
    bool dfs(const std::vector<std::vector<char>>& board, const std::string& word, int r, int c, size_t k) { // @viz call
        if (k == word.size()) return true; // every letter matched // @viz found
        if (r < 0 || r >= R || c < 0 || c >= C || seen[r][c] || board[r][c] != word[k]) // @viz fail
            return false; // off the board, already used, or the wrong letter // @viz fail
        seen[r][c] = true; // @viz take
        bool found = dfs(board, word, r + 1, c, k + 1) || dfs(board, word, r - 1, c, k + 1) || // @viz take
                     dfs(board, word, r, c + 1, k + 1) || dfs(board, word, r, c - 1, k + 1); // @viz take
        seen[r][c] = false; // undo: other paths may use this cell // @viz undo
        return found; // @viz undo
    }
};
