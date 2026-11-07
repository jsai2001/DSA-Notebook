#include <vector>
class Solution {
public:
    bool containsDuplicate(std::vector<int>& nums) {
        const int n = nums.size(); // @viz init
        for (int i = 0; i < n; ++i) // compare every pair once // @viz pair
            for (int j = i + 1; j < n; ++j) // @viz pair
                if (nums[i] == nums[j]) return true; // @viz found
        return false; // @viz none
    }
};
