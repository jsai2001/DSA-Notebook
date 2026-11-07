#include <vector>
class Solution {
public:
    std::vector<int> dailyTemperatures(std::vector<int>& temperatures) {
        const int n = temperatures.size(); // @viz init
        std::vector<int> ans(n, 0), stack; // stack: days still waiting for a warmer day // @viz init
        for (int i = 0; i < n; ++i) { // @viz day
            while (!stack.empty() && temperatures[stack.back()] < temperatures[i]) { // today is warmer than the day on top // @viz pop
                ans[stack.back()] = i - stack.back(); // its wait is over // @viz pop
                stack.pop_back(); // @viz pop
            }
            stack.push_back(i); // today waits too // @viz push
        }
        return ans; // days left on the stack never get a warmer day: 0 // @viz return
    }
};
