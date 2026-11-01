#include <algorithm>
#include <stack>
#include <vector>
class Solution {
public:
    int trap(std::vector<int>& height) {
        std::stack<int> stack; // indices of bars whose heights go down from bottom to top // @viz init
        int total = 0; // @viz init
        for (int i = 0; i < (int)height.size(); ++i) { // @viz loop
            while (!stack.empty() && height[stack.top()] < height[i]) { // bar i is taller than the top: water can sit on the top bar // @viz pop
                int bottom = stack.top(); // @viz pop
                stack.pop(); // @viz pop
                if (stack.empty()) break; // no wall on the left, so that water would run off // @viz no-left
                int left = stack.top(); // @viz fill
                int width = i - left - 1; // @viz fill
                int depth = std::min(height[left], height[i]) - height[bottom]; // @viz fill
                total += width * depth; // one horizontal layer of water between left and i // @viz fill
            }
            stack.push(i); // @viz push
        }
        return total; // @viz return
    }
};
