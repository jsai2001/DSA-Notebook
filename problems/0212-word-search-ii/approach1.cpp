#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::string> findWords(std::vector<std::vector<char>>& board, std::vector<std::string>& words) {
        std::vector<std::string> res; // @viz init
        for (const std::string& word : words) { // search the whole board again for every word // @viz word
            bool found = false; // @viz word
            for (int r = 0; r < (int)board.size() && !found; ++r) // @viz word
                for (int c = 0; c < (int)board[0].size() && !found; ++c) // @viz word
                    found = match(board, r, c, word, 0); // @viz word
            if (found) res.push_back(word); // @viz found
        }
        return res; // @viz return
    }
private:
    bool match(std::vector<std::vector<char>>& board, int r, int c, const std::string& word, size_t i) { // does word[i:] start at (r, c)? // @viz match
        if (r < 0 || r >= (int)board.size() || c < 0 || c >= (int)board[0].size()) return false; // @viz match
        if (board[r][c] != word[i]) return false; // wrong letter, or '#' = already on the path // @viz match
        if (i == word.size() - 1) return true; // the last letter matched // @viz match
        board[r][c] = '#'; // mark the cell as used on this path // @viz match
        bool found = match(board, r + 1, c, word, i + 1) || match(board, r - 1, c, word, i + 1) || // @viz match
                     match(board, r, c + 1, word, i + 1) || match(board, r, c - 1, word, i + 1); // @viz match
        board[r][c] = word[i]; // unmark it on the way back // @viz match
        return found; // @viz match
    }
};
