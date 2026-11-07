#include <algorithm>
#include <vector>
class Solution {
public:
    int missingNumber(std::vector<int>& nums) {
        std::sort(nums.begin(), nums.end()); // @viz sort
        for (int i = 0; i < (int)nums.size(); ++i) // sorted, the value at index i should be i // @viz scan
            if (nums[i] != i) return i; // the first gap // @viz found
        return nums.size(); // 0..n-1 are all there: n is missing // @viz end
    }
};
