#include <vector>
class Solution {
public:
    bool searchMatrix(std::vector<std::vector<int>>& matrix, int target) {
        // Start at the top-right corner: everything to its left is smaller, everything below is bigger.
        int r = 0, c = (int)matrix[0].size() - 1; // @viz init
        while (r < (int)matrix.size() && c >= 0) { // @viz loop
            int value = matrix[r][c]; // @viz loop
            if (value == target) { // @viz found
                return true; // @viz found
            }
            if (value > target) { // too big: the whole column below is bigger still // @viz left
                --c; // @viz left
            } else { // too small: the rest of this row is to the left, smaller still // @viz down
                ++r; // @viz down
            }
        }
        return false; // walked off the matrix // @viz return
    }
};
