#include <algorithm>
#include <vector>
class Solution {
public:
    int trap(std::vector<int>& height) {
        int n = (int)height.size();
        int total = 0; // @viz init
        for (int i = 0; i < n; ++i) { // @viz loop
            int leftMax = 0, rightMax = 0;
            for (int j = 0; j <= i; ++j) leftMax = std::max(leftMax, height[j]); // tallest bar from the start up to i // @viz left
            for (int j = i; j < n; ++j) rightMax = std::max(rightMax, height[j]); // tallest bar from i to the end // @viz right
            total += std::min(leftMax, rightMax) - height[i]; // water stands as high as the lower of the two walls // @viz add
        }
        return total; // @viz return
    }
};
