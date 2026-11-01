#include <algorithm>
#include <utility>
#include <vector>
class Solution {
public:
    void rotate(std::vector<std::vector<int>>& matrix) {
        int n = (int)matrix.size();
        for (int i = 0; i < n; ++i) // 1. transpose: flip over the main diagonal // @viz transpose
            for (int j = i + 1; j < n; ++j) // only above the diagonal, or every pair swaps twice // @viz transpose
                std::swap(matrix[i][j], matrix[j][i]); // @viz transpose
        for (std::vector<int>& row : matrix) // 2. reverse each row: flip left to right // @viz reverse
            std::reverse(row.begin(), row.end()); // @viz reverse
    }
};
