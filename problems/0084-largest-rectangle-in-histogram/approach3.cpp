#include <algorithm>
#include <vector>
class Solution {
public:
    int largestRectangleArea(std::vector<int>& heights) {
        int n = (int)heights.size(); // @viz init
        std::vector<int> stack; // indices; their heights go up from bottom to top // @viz init
        int best = 0; // @viz init
        for (int i = 0; i <= n; ++i) { // i == n is a bar of height 0 that empties the stack // @viz loop
            int h = i < n ? heights[i] : 0; // @viz loop
            while (!stack.empty() && heights[stack.back()] >= h) { // bar i is a right wall for the top bar // @viz pop
                int top = heights[stack.back()]; // @viz pop
                stack.pop_back(); // @viz pop
                int left = stack.empty() ? -1 : stack.back(); // the bar below it is shorter: its left wall // @viz width
                best = std::max(best, top * (i - left - 1)); // it spans left+1 .. i-1 // @viz width
            }
            stack.push_back(i); // @viz push
        }
        return best; // @viz return
    }
};
