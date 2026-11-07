#include <vector>
class Solution {
public:
    int missingNumber(std::vector<int>& nums) {
        int res = nums.size(); // start with n, the one index that has no slot // @viz init
        for (int i = 0; i < (int)nums.size(); ++i) // @viz xor
            res ^= i ^ nums[i]; // every number that's present appears twice (as an index and a value) and cancels // @viz xor
        return res; // only the missing one is left // @viz return
    }
};
