#include <algorithm>
#include <vector>
class Solution {
public:
    int rob(std::vector<int>& nums) {
        const int n = nums.size(); // @viz init
        if (n == 1) return nums[0]; // one house: it has no neighbours // @viz one
        return std::max(bestRange(nums, 0, n - 2), bestRange(nums, 1, n - 1)); // the first and last houses touch: leave out one of them // @viz answer
    }
private:
    std::vector<int> memo;
    int bestRange(const std::vector<int>& nums, int lo, int hi) { // House Robber on nums[lo..hi], with a memo // @viz range
        memo.assign(nums.size(), -1); // @viz range
        return best(nums, lo, hi); // @viz range
    }
    int best(const std::vector<int>& nums, int i, int hi) { // the most from houses i..hi // @viz call
        if (i > hi) return 0; // @viz base
        if (memo[i] < 0) // @viz memo
            memo[i] = std::max(best(nums, i + 1, hi), nums[i] + best(nums, i + 2, hi)); // skip house i, or rob it // @viz choose
        return memo[i]; // @viz memo
    }
};
