#include <numeric>
#include <vector>
class Solution {
    bool pick(const std::vector<int>& nums, size_t i, int left) { // can some of nums[i:] add up to exactly left? // @viz call
        if (left == 0) return true; // @viz found
        if (i == nums.size() || left < 0) return false; // @viz dead
        return pick(nums, i + 1, left - nums[i]) || pick(nums, i + 1, left); // take nums[i], or skip it // @viz call
    }
public:
    bool canPartition(std::vector<int>& nums) {
        int total = std::accumulate(nums.begin(), nums.end(), 0); // @viz init
        if (total % 2) return false; // an odd total can't split into two equal halves // @viz init
        return pick(nums, 0, total / 2); // @viz return
    }
};
