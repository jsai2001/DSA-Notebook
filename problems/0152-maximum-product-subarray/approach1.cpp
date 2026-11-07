#include <algorithm>
#include <vector>
class Solution {
public:
    int maxProduct(std::vector<int>& nums) {
        int best = nums[0]; // not 0: the answer can be negative // @viz init
        for (size_t i = 0; i < nums.size(); ++i) { // every start // @viz start
            int prod = 1; // every subarray product fits in 32 bits (given) // @viz start
            for (size_t j = i; j < nums.size(); ++j) { // extend to every end, keeping a running product // @viz extend
                prod *= nums[j]; // @viz extend
                best = std::max(best, prod); // @viz best
            }
        }
        return best; // @viz return
    }
};
