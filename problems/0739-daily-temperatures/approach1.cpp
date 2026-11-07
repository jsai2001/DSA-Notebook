#include <vector>
class Solution {
public:
    std::vector<int> dailyTemperatures(std::vector<int>& temperatures) {
        const int n = temperatures.size(); // @viz init
        std::vector<int> ans(n, 0); // 0 when no warmer day comes // @viz init
        for (int i = 0; i < n; ++i) // @viz day
            for (int j = i + 1; j < n; ++j) // look ahead, day by day // @viz look
                if (temperatures[j] > temperatures[i]) { // the first warmer day // @viz found
                    ans[i] = j - i; // @viz found
                    break; // @viz found
                }
        return ans; // @viz return
    }
};
