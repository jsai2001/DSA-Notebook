#include <algorithm>
#include <functional>
#include <vector>
class Solution {
public:
    int findKthLargest(std::vector<int>& nums, int k) {
        std::sort(nums.begin(), nums.end(), std::greater<int>()); // biggest first // @viz sort
        return nums[k - 1]; // the k-th one (k is 1-based) // @viz pick
    }
};
