#include <numeric>
#include <vector>
class Solution {
public:
    bool canPartition(std::vector<int>& nums) {
        int total = std::accumulate(nums.begin(), nums.end(), 0); // @viz init
        if (total % 2) return false; // an odd total can't split into two equal halves // @viz init
        int half = total / 2; // @viz init
        std::vector<char> dp(half + 1, 0); // dp[s]: some of the numbers so far add up to s // @viz init
        dp[0] = 1; // @viz init
        for (int x : nums) { // @viz num
            for (int s = half; s >= x; --s) // downwards, so x is used at most once // @viz fill
                dp[s] |= dp[s - x]; // @viz fill
            if (dp[half]) return true; // @viz found
        }
        return false; // @viz return
    }
};
