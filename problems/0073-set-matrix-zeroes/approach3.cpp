#include <vector>
class Solution {
public:
    void setZeroes(std::vector<std::vector<int>>& matrix) {
        int m = (int)matrix.size(), n = (int)matrix[0].size(); // @viz init
        // Use row 0 and column 0 as the marks. matrix[0][0] marks row 0,
        // so column 0 needs a mark of its own: this flag.
        bool col0Zero = false; // @viz init
        for (int i = 0; i < m; ++i) { // @viz mark
            if (matrix[i][0] == 0) col0Zero = true; // a zero in column 0: remember it in the flag // @viz mark
            for (int j = 1; j < n; ++j) { // @viz mark
                if (matrix[i][j] == 0) { // @viz mark
                    matrix[i][0] = 0; // mark row i // @viz mark
                    matrix[0][j] = 0; // mark column j // @viz mark
                }
            }
        }
        for (int i = 1; i < m; ++i) { // the inside first, while the marks are still intact // @viz fill
            for (int j = 1; j < n; ++j) { // @viz fill
                if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0; // @viz fill
            }
        }
        if (matrix[0][0] == 0) { // row 0 had a zero // @viz row0
            for (int j = 0; j < n; ++j) matrix[0][j] = 0; // @viz row0
        }
        if (col0Zero) { // column 0 had a zero // @viz col0
            for (int i = 0; i < m; ++i) matrix[i][0] = 0; // @viz col0
        }
    }
};
