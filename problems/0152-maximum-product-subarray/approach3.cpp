#include <algorithm>
#include <utility>
#include <vector>
class Solution {
public:
    int maxProduct(std::vector<int>& nums) {
        int hi = nums[0], lo = nums[0], best = nums[0]; // largest and smallest product ending here // @viz init
        for (size_t i = 1; i < nums.size(); ++i) { // @viz loop
            int x = nums[i]; // @viz loop
            if (x < 0) std::swap(hi, lo); // a negative number turns the largest into the smallest, and back // @viz swap
            hi = std::max(x, hi * x); // start fresh at x, or extend // @viz update
            lo = std::min(x, lo * x); // @viz update
            best = std::max(best, hi); // @viz best
        }
        return best; // @viz return
    }
};
