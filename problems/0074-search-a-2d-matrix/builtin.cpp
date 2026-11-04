#include <algorithm>
#include <vector>
class Solution {
public:
    bool searchMatrix(std::vector<std::vector<int>>& matrix, int target) {
        // The first row whose first value is > target; the row before it is the only one that can hold it.
        auto after = std::upper_bound(matrix.begin(), matrix.end(), target,
                                      [](int t, const std::vector<int>& row) { return t < row[0]; });
        if (after == matrix.begin()) return false; // smaller than everything
        const std::vector<int>& row = *(after - 1);
        return std::binary_search(row.begin(), row.end(), target);
    }
};
