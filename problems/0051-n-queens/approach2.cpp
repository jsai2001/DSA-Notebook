#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::vector<std::string>> solveNQueens(int n) {
        this->n = n; // @viz init
        result.clear(); // @viz init
        board.assign(n, std::string(n, '.')); // @viz init
        usedCol.assign(n, false); // @viz init
        usedDiag.assign(2 * n - 1, false); // r - c runs from -(n-1) to n-1: stored at r - c + n - 1 // @viz init
        usedAnti.assign(2 * n - 1, false); // r + c runs from 0 to 2n-2 // @viz init
        place(0); // @viz init
        return result; // @viz return
    }
private:
    int n = 0;
    std::vector<std::vector<std::string>> result;
    std::vector<std::string> board;
    std::vector<bool> usedCol, usedDiag, usedAnti;
    void place(int r) { // @viz call
        if (r == n) { // a queen in every row, none attacking another // @viz done
            result.push_back(board); // @viz done
            return; // @viz done
        }
        for (int c = 0; c < n; ++c) { // @viz try
            if (usedCol[c] || usedDiag[r - c + n - 1] || usedAnti[r + c]) continue; // attacked: skip // @viz attacked
            usedCol[c] = usedDiag[r - c + n - 1] = usedAnti[r + c] = true; // @viz place
            board[r][c] = 'Q'; // @viz place
            place(r + 1); // @viz place
            board[r][c] = '.'; // undo, so the next column can be tried // @viz undo
            usedCol[c] = usedDiag[r - c + n - 1] = usedAnti[r + c] = false; // @viz undo
        }
    }
};
