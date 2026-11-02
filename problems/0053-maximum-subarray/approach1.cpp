#include <algorithm>
#include <vector>
class Solution {
public:
    int maxSubArray(std::vector<int>& nums) {
        int best = nums[0]; // not 0: every number may be negative // @viz init
        for (size_t i = 0; i < nums.size(); ++i) { // every start // @viz start
            int total = 0; // @viz start
            for (size_t j = i; j < nums.size(); ++j) { // every end, adding one number at a time // @viz extend
                total += nums[j]; // sum of nums[i..j] // @viz extend
                best = std::max(best, total); // @viz extend
            }
        }
        return best; // @viz return
    }
};
