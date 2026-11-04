#include <vector>
class Solution {
public:
    bool searchMatrix(std::vector<std::vector<int>>& matrix, int target) {
        for (const auto& row : matrix) { // @viz row
            for (int value : row) { // look at every cell // @viz cell
                if (value == target) { // @viz cell
                    return true; // @viz found
                }
            }
        }
        return false; // @viz return
    }
};
