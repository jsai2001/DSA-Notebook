#include <vector>
class Solution {
public:
    void rotate(std::vector<std::vector<int>>& matrix) {
        int n = (int)matrix.size();
        std::vector<std::vector<int>> rotated(n, std::vector<int>(n)); // a second n × n grid // @viz init
        for (int i = 0; i < n; ++i) // @viz copy
            for (int j = 0; j < n; ++j) // @viz copy
                rotated[j][n - 1 - i] = matrix[i][j]; // row i becomes column n - 1 - i // @viz copy
        matrix = rotated; // copy back: the answer has to end up in matrix itself // @viz back
    }
};
