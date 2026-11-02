#include <vector>
class Solution {
public:
    std::vector<int> spiralOrder(std::vector<std::vector<int>>& matrix) {
        int top = 0, bottom = (int)matrix.size() - 1; // the rows and columns not taken yet // @viz init
        int left = 0, right = (int)matrix[0].size() - 1; // @viz init
        std::vector<int> result; // @viz init
        while (top <= bottom && left <= right) { // one ring per round // @viz ring
            for (int c = left; c <= right; ++c) result.push_back(matrix[top][c]); // top row, left to right // @viz top
            ++top; // @viz top
            for (int r = top; r <= bottom; ++r) result.push_back(matrix[r][right]); // right column, top to bottom // @viz right
            --right; // @viz right
            if (top <= bottom) { // a row is still left (not the one just taken) // @viz bottom
                for (int c = right; c >= left; --c) result.push_back(matrix[bottom][c]); // bottom row, right to left // @viz bottom
                --bottom; // @viz bottom
            }
            if (left <= right) { // a column is still left // @viz left
                for (int r = bottom; r >= top; --r) result.push_back(matrix[r][left]); // left column, bottom to top // @viz left
                ++left; // @viz left
            }
        }
        return result; // @viz return
    }
};
