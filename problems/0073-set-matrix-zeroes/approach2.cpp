#include <vector>
class Solution {
public:
    void setZeroes(std::vector<std::vector<int>>& matrix) {
        int m = (int)matrix.size(), n = (int)matrix[0].size(); // @viz init
        std::vector<bool> zeroRows(m, false), zeroCols(n, false); // @viz init
        for (int i = 0; i < m; ++i) { // pass 1: only remember where the zeros are // @viz mark
            for (int j = 0; j < n; ++j) { // @viz mark
                if (matrix[i][j] == 0) zeroRows[i] = zeroCols[j] = true; // @viz mark
            }
        }
        for (int i = 0; i < m; ++i) { // pass 2: zero every cell in a marked row or column // @viz fill
            for (int j = 0; j < n; ++j) { // @viz fill
                if (zeroRows[i] || zeroCols[j]) matrix[i][j] = 0; // @viz fill
            }
        }
    }
};
