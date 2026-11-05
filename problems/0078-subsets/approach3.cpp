#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> subsets(std::vector<int>& nums) {
        int n = (int)nums.size(); // @viz init
        std::vector<std::vector<int>> result; // @viz init
        for (int mask = 0; mask < (1 << n); ++mask) { // 2^n masks, one per subset // @viz mask
            std::vector<int> subset; // @viz mask
            for (int i = 0; i < n; ++i) // @viz bit
                if ((mask >> i) & 1) // bit i is 1: nums[i] is in this subset // @viz bit
                    subset.push_back(nums[i]); // @viz bit
            result.push_back(subset); // @viz add
        }
        return result; // @viz return
    }
};
