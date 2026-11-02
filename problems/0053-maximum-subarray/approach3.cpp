#include <algorithm>
#include <vector>
class Solution {
public:
    int maxSubArray(std::vector<int>& nums) {
        int best = nums[0], cur = nums[0]; // cur: the largest sum of a subarray that ends here // @viz init
        for (size_t i = 1; i < nums.size(); ++i) { // @viz loop
            cur = std::max(nums[i], cur + nums[i]); // extend the run, or start again here if the run so far is negative // @viz cur
            best = std::max(best, cur); // @viz best
        }
        return best; // @viz return
    }
};
