#include <cstdlib>
#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::vector<std::string>> solveNQueens(int n) {
        this->n = n; // @viz init
        result.clear(); // @viz init
        cols.clear(); // cols[r]: column of the queen in row r // @viz init
        used.assign(n, false); // one queen per column // @viz init
        place(0); // @viz init
        return result; // @viz return
    }
private:
    int n = 0;
    std::vector<std::vector<std::string>> result;
    std::vector<int> cols;
    std::vector<bool> used;
    void place(int r) { // @viz call
        if (r == n) { // a queen in every row and column: only now look at diagonals // @viz full
            if (noDiagonalAttacks()) result.push_back(board()); // @viz check, keep
            return; // @viz full
        }
        for (int c = 0; c < n; ++c) { // @viz try
            if (used[c]) continue; // @viz try
            used[c] = true; // @viz try
            cols.push_back(c); // @viz try
            place(r + 1); // @viz try
            cols.pop_back(); // @viz undo
            used[c] = false; // @viz undo
        }
    }
    bool noDiagonalAttacks() const {
        for (int i = 0; i < n; ++i)
            for (int j = i + 1; j < n; ++j)
                if (std::abs(cols[i] - cols[j]) == j - i) return false; // rows apart == columns apart: same diagonal
        return true;
    }
    std::vector<std::string> board() const {
        std::vector<std::string> rows(n, std::string(n, '.'));
        for (int r = 0; r < n; ++r) rows[r][cols[r]] = 'Q';
        return rows;
    }
};
