#include <algorithm>
#include <vector>
class Solution {
public:
    int rob(std::vector<int>& nums) {
        const int n = nums.size(); // @viz init
        std::vector<int> dp(n + 1, 0); // dp[i] = the most from the first i houses // @viz init
        dp[1] = nums[0]; // @viz init
        for (int i = 2; i <= n; ++i) // @viz loop
            dp[i] = std::max(dp[i - 1], dp[i - 2] + nums[i - 1]); // leave house i - 1, or rob it on top of dp[i - 2] // @viz choose
        return dp[n]; // @viz return
    }
};
