#include <algorithm>
#include <numeric>
#include <vector>
class Solution {
public:
    int trap(std::vector<int>& height) {
        auto bigger = [](int a, int b) { return std::max(a, b); };
        std::vector<int> leftMax(height.size()), rightMax(height.size());
        std::partial_sum(height.begin(), height.end(), leftMax.begin(), bigger); // running maximum from the left
        std::partial_sum(height.rbegin(), height.rend(), rightMax.rbegin(), bigger); // and from the right
        int total = 0;
        for (size_t i = 0; i < height.size(); ++i) total += std::min(leftMax[i], rightMax[i]) - height[i];
        return total;
    }
};
