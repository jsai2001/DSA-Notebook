#include <algorithm>
#include <climits>
#include <vector>
class Solution {
public:
    int maxSubArray(std::vector<int>& nums) {
        return best(nums, 0, (int)nums.size() - 1); // @viz start
    }
private:
    int best(const std::vector<int>& nums, int lo, int hi) { // largest sum of a subarray inside nums[lo..hi] // @viz call
        if (lo == hi) return nums[lo]; // one number // @viz base
        int mid = lo + (hi - lo) / 2; // @viz split
        int left = best(nums, lo, mid); // the best subarray lies entirely in the left half // @viz split
        int right = best(nums, mid + 1, hi); // ... or entirely in the right half // @viz split
        // ... or it crosses the middle: the best run ending at mid, plus the best run starting at mid + 1
        int total = 0, leftRun = INT_MIN; // @viz cross
        for (int i = mid; i >= lo; --i) { // @viz cross
            total += nums[i]; // @viz cross
            leftRun = std::max(leftRun, total); // @viz cross
        }
        int rightRun = INT_MIN; // @viz cross
        total = 0; // @viz cross
        for (int j = mid + 1; j <= hi; ++j) { // @viz cross
            total += nums[j]; // @viz cross
            rightRun = std::max(rightRun, total); // @viz cross
        }
        return std::max({left, right, leftRun + rightRun}); // both runs hold at least one number by now // @viz combine
    }
};
