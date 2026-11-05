#include <algorithm>
#include <vector>
class Solution {
public:
    int largestRectangleArea(std::vector<int>& heights) {
        int n = (int)heights.size(); // @viz init
        int best = 0; // at most 10^5 · 10^4 = 10^9, which fits in an int // @viz init
        for (int i = 0; i < n; ++i) { // left edge // @viz start
            int low = heights[i]; // the shortest bar in heights[i..j] sets the height // @viz start
            for (int j = i; j < n; ++j) { // right edge // @viz grow
                low = std::min(low, heights[j]); // @viz grow
                best = std::max(best, low * (j - i + 1)); // @viz area
            }
        }
        return best; // @viz return
    }
};
