#include <vector>
class Solution {
public:
    std::vector<int> spiralOrder(std::vector<std::vector<int>>& matrix) {
        std::vector<std::vector<int>> rest = matrix; // work on a copy // @viz init
        std::vector<int> result; // @viz init
        while (!rest.empty()) { // @viz peel
            result.insert(result.end(), rest[0].begin(), rest[0].end()); // take the whole first row // @viz peel
            rest.erase(rest.begin()); // @viz peel
            if (rest.empty()) break; // @viz peel
            // turn what's left a quarter counter-clockwise: its right column becomes the first row
            int rows = (int)rest.size(), cols = (int)rest[0].size(); // @viz rotate
            std::vector<std::vector<int>> turned(cols, std::vector<int>(rows)); // @viz rotate
            for (int i = 0; i < cols; ++i) // @viz rotate
                for (int j = 0; j < rows; ++j) turned[i][j] = rest[j][cols - 1 - i]; // @viz rotate
            rest = turned; // @viz rotate
        }
        return result; // @viz return
    }
};
