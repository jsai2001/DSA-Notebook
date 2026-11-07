#include <algorithm>
#include <vector>
class Solution {
public:
    int maxProduct(std::vector<int>& nums) {
        const int n = nums.size(); // @viz init
        int best = nums[0]; // @viz init
        int left = 1, right = 1; // @viz init
        for (int i = 0; i < n; ++i) { // @viz scan
            // A product restarts after a 0 (multiplying by 0 would stick at 0).
            left = (left ? left : 1) * nums[i]; // from the left: the prefix ending at i // @viz scan
            right = (right ? right : 1) * nums[n - 1 - i]; // from the right: the suffix starting at n-1-i // @viz scan
            best = std::max({best, left, right}); // @viz best
        }
        return best; // @viz return
    }
};
