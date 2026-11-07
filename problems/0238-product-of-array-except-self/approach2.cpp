#include <vector>
class Solution {
public:
    std::vector<int> productExceptSelf(std::vector<int>& nums) {
        const int n = nums.size(); // @viz init
        std::vector<int> left(n, 1), right(n, 1), ans(n); // left[i]: product before i; right[i]: product after i // @viz init
        for (int i = 1; i < n; ++i) left[i] = left[i - 1] * nums[i - 1]; // @viz left
        for (int i = n - 2; i >= 0; --i) right[i] = right[i + 1] * nums[i + 1]; // @viz right
        for (int i = 0; i < n; ++i) ans[i] = left[i] * right[i]; // before i times after i: everything but nums[i] // @viz combine
        return ans; // @viz combine
    }
};
