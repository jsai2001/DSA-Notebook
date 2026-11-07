#include <vector>
class Solution {
    int ways(const std::vector<int>& nums, int target, size_t i, int total) { // sign choices for nums[i:] that bring total to target // @viz call
        if (i == nums.size()) return total == target; // every number has a sign // @viz leaf
        return ways(nums, target, i + 1, total + nums[i]) + ways(nums, target, i + 1, total - nums[i]); // + or - // @viz call
    }
public:
    int findTargetSumWays(std::vector<int>& nums, int target) {
        return ways(nums, target, 0, 0); // @viz return
    }
};
