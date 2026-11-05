#include <algorithm>
#include <array>
#include <string>
#include <vector>
class Solution {
public:
    bool exist(std::vector<std::vector<char>>& board, std::string word) {
        R = (int)board.size(); // @viz init
        C = (int)board[0].size(); // @viz init
        std::array<int, 128> have{}; // @viz count
        for (const auto& row : board) // @viz count
            for (char ch : row) ++have[ch]; // @viz count
        std::array<int, 128> need{}; // @viz count
        for (char ch : word) // @viz count
            if (++need[ch] > have[ch]) return false; // the board doesn't have enough of this letter: no search at all // @viz count
        if (have[word.front()] > have[word.back()]) // start from the rarer end: fewer first cells to try // @viz flip
            std::reverse(word.begin(), word.end()); // a path spells word exactly when, walked back, it spells the reverse // @viz flip
        for (int r = 0; r < R; ++r) // try every cell as the first letter // @viz start
            for (int c = 0; c < C; ++c) // @viz start
                if (dfs(board, word, r, c, 0)) return true; // @viz start, return
        return false; // @viz return
    }
private:
    int R = 0, C = 0;
    // Can word[k..] be spelled starting at (r, c)?
    bool dfs(std::vector<std::vector<char>>& board, const std::string& word, int r, int c, size_t k) { // @viz call
        if (k == word.size()) return true; // every letter matched // @viz found
        if (r < 0 || r >= R || c < 0 || c >= C || board[r][c] != word[k]) // @viz fail
            return false; // off the board or the wrong letter ('#' never matches) // @viz fail
        char letter = board[r][c]; // @viz take
        board[r][c] = '#'; // mark: this cell is on the path // @viz take
        bool found = dfs(board, word, r + 1, c, k + 1) || dfs(board, word, r - 1, c, k + 1) || // @viz take
                     dfs(board, word, r, c + 1, k + 1) || dfs(board, word, r, c - 1, k + 1); // @viz take
        board[r][c] = letter; // put the letter back // @viz undo
        return found; // @viz undo
    }
};
