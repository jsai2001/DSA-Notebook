#include <algorithm>
#include <functional>
#include <vector>
class Solution {
public:
    int findKthLargest(std::vector<int>& nums, int k) {
        std::nth_element(nums.begin(), nums.begin() + (k - 1), nums.end(), std::greater<int>()); // quickselect inside
        return nums[k - 1];
    }
};
