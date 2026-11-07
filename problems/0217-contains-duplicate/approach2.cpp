#include <algorithm>
#include <vector>
class Solution {
public:
    bool containsDuplicate(std::vector<int>& nums) {
        std::sort(nums.begin(), nums.end()); // equal values end up side by side // @viz sort
        for (size_t i = 1; i < nums.size(); ++i) // @viz scan
            if (nums[i] == nums[i - 1]) return true; // @viz found
        return false; // @viz none
    }
};
