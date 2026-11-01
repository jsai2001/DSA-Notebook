#include <algorithm>
#include <vector>
class Solution {
public:
    int jump(std::vector<int>& nums) {
        int n = (int)nums.size();
        std::vector<int> dp(n, n); // dp[i]: fewest jumps to reach i (n means "not reached yet") // @viz init
        dp[0] = 0; // @viz init
        for (int i = 0; i < n; ++i) // @viz from
            for (int j = i + 1; j <= std::min(n - 1, i + nums[i]); ++j) // every index one jump from i // @viz relax
                dp[j] = std::min(dp[j], dp[i] + 1); // @viz relax
        return dp[n - 1]; // @viz return
    }
};
