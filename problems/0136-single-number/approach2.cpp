#include <algorithm>
#include <vector>
class Solution {
public:
    int singleNumber(std::vector<int>& nums) {
        std::sort(nums.begin(), nums.end()); // equal values end up side by side (sorts the input) // @viz sort
        for (size_t i = 0; i + 1 < nums.size(); i += 2) { // look at pairs (0, 1), (2, 3), ... // @viz pair
            if (nums[i] != nums[i + 1]) { // this pair is broken: nums[i] is the single one // @viz broken
                return nums[i]; // @viz broken
            }
        }
        return nums.back(); // every pair matched: the single one is last // @viz last
    }
};
