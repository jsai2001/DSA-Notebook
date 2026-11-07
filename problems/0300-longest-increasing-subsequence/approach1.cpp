#include <algorithm>
#include <vector>
class Solution {
public:
    int lengthOfLIS(std::vector<int>& nums) {
        memo.assign(nums.size(), 0); // 0 = not worked out yet // @viz init
        int ans = 0; // @viz return
        for (int i = 0; i < (int)nums.size(); ++i) ans = std::max(ans, longest(nums, i)); // it can start anywhere // @viz return
        return ans; // @viz return
    }
private:
    std::vector<int> memo;
    int longest(const std::vector<int>& nums, int i) { // the longest increasing subsequence that starts with nums[i] // @viz call
        if (memo[i]) return memo[i]; // @viz memo
        int best = 1; // nums[i] alone // @viz memo
        for (int j = i + 1; j < (int)nums.size(); ++j) // try every bigger value after it as the next one // @viz try
            if (nums[j] > nums[i]) best = std::max(best, 1 + longest(nums, j)); // @viz try
        return memo[i] = best; // @viz store
    }
};
