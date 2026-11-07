#include <algorithm>
#include <vector>
class Solution {
public:
    int rob(std::vector<int>& nums) {
        const int n = nums.size(); // @viz init
        if (n == 1) return nums[0]; // one house: it has no neighbours // @viz one
        return std::max(bestRange(nums, 0, n - 2), bestRange(nums, 1, n - 1)); // without the last house, or without the first // @viz answer
    }
private:
    int bestRange(const std::vector<int>& nums, int lo, int hi) { // House Robber on nums[lo..hi] // @viz range
        const int m = hi - lo + 1; // @viz range
        std::vector<int> dp(m + 1, 0); // dp[i] = the most from the first i houses of the range // @viz range
        dp[1] = nums[lo]; // @viz range
        for (int i = 2; i <= m; ++i) // @viz loop
            dp[i] = std::max(dp[i - 1], dp[i - 2] + nums[lo + i - 1]); // @viz choose
        return dp[m]; // @viz range
    }
};
