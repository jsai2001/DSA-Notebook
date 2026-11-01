#include <algorithm>
#include <utility>
#include <vector>
class Solution {
public:
    void rotate(std::vector<std::vector<int>>& matrix) {
        std::reverse(matrix.begin(), matrix.end()); // flip top to bottom (just swaps row pointers)
        for (size_t i = 0; i < matrix.size(); ++i) // then transpose
            for (size_t j = i + 1; j < matrix.size(); ++j) std::swap(matrix[i][j], matrix[j][i]);
    }
};
