#include <algorithm>
#include <vector>
class Solution {
public:
    int largestRectangleArea(std::vector<int>& heights) {
        int n = (int)heights.size(); // @viz init
        std::vector<int> left(n, -1); // left[i]: nearest bar to the left that is shorter than bar i (-1 = none) // @viz init
        std::vector<int> right(n, n); // right[i]: nearest shorter bar to the right (n = none) // @viz init
        std::vector<int> stack; // indices; their heights go up from bottom to top // @viz init
        for (int i = 0; i < n; ++i) { // @viz leftpass
            while (!stack.empty() && heights[stack.back()] >= heights[i]) // not shorter: can't be anyone's left wall // @viz leftpass
                stack.pop_back(); // @viz leftpass
            left[i] = stack.empty() ? -1 : stack.back(); // @viz leftpass
            stack.push_back(i); // @viz leftpass
        }
        stack.clear(); // @viz rightpass
        for (int i = n - 1; i >= 0; --i) { // the same, from the right // @viz rightpass
            while (!stack.empty() && heights[stack.back()] >= heights[i]) // @viz rightpass
                stack.pop_back(); // @viz rightpass
            right[i] = stack.empty() ? n : stack.back(); // @viz rightpass
            stack.push_back(i); // @viz rightpass
        }
        int best = 0; // @viz area
        for (int i = 0; i < n; ++i) // the widest rectangle as tall as bar i spans left[i]+1 .. right[i]-1 // @viz area
            best = std::max(best, heights[i] * (right[i] - left[i] - 1)); // @viz area
        return best; // @viz return
    }
};
