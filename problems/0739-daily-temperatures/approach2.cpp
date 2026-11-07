#include <vector>
class Solution {
public:
    std::vector<int> dailyTemperatures(std::vector<int>& temperatures) {
        const int n = temperatures.size(); // @viz init
        std::vector<int> ans(n, 0); // @viz init
        for (int i = n - 2; i >= 0; --i) { // right to left: the days after i are already solved // @viz day
            int j = i + 1; // @viz look
            while (j < n && temperatures[j] <= temperatures[i]) // day j isn't warmer... // @viz jump
                j = ans[j] ? j + ans[j] : n; // ...so jump straight to day j's own warmer day (or give up) // @viz jump
            if (j < n) ans[i] = j - i; // @viz found
        }
        return ans; // @viz return
    }
};
