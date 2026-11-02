#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::vector<std::string>> solveNQueens(int n) {
        this->n = n; // @viz init
        result.clear(); // @viz init
        cols.clear(); // cols[r]: column of the queen in row r // @viz init
        full = (1 << n) - 1; // n one-bits: bit c stands for column c // @viz init
        place(0, 0, 0); // @viz init
        return result; // @viz return
    }
private:
    int n = 0, full = 0;
    std::vector<std::vector<std::string>> result;
    std::vector<int> cols;
    void place(int colMask, int diagMask, int antiMask) { // bits set = columns attacked in this row // @viz call
        if (colMask == full) { // every column has a queen: every row does too // @viz done
            std::vector<std::string> rows(n, std::string(n, '.')); // @viz done
            for (int r = 0; r < n; ++r) rows[r][cols[r]] = 'Q'; // @viz done
            result.push_back(rows); // @viz done
            return; // @viz done
        }
        int free = full & ~(colMask | diagMask | antiMask); // columns that are safe in this row // @viz free
        while (free) { // @viz pick
            int bit = free & -free; // the lowest safe column // @viz pick
            free -= bit; // @viz pick
            cols.push_back(__builtin_ctz(bit)); // index of that bit = the column // @viz pick
            // one row down, a down-right attack moves one column right (<< 1), a down-left one left (>> 1)
            place(colMask | bit, ((diagMask | bit) << 1) & full, (antiMask | bit) >> 1); // @viz pick
            cols.pop_back(); // undo // @viz undo
        }
    }
};
