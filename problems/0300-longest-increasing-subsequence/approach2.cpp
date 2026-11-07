#include <algorithm>
#include <vector>
class Solution {
public:
    int lengthOfLIS(std::vector<int>& nums) {
        const int n = nums.size(); // @viz init
        std::vector<int> dp(n, 1); // dp[i] = the longest increasing subsequence that ends at nums[i] // @viz init
        for (int i = 0; i < n; ++i) // @viz end
            for (int j = 0; j < i; ++j) // any smaller value before i can come just before nums[i] // @viz try
                if (nums[j] < nums[i]) dp[i] = std::max(dp[i], dp[j] + 1); // @viz try
        return *std::max_element(dp.begin(), dp.end()); // it can end anywhere // @viz return
    }
};
