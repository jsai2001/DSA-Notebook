#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> seen; // {value: index} // @viz init
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i]; // @viz complement
            if (seen.find(complement) != seen.end()) { // @viz check
                return {seen[complement], i}; // @viz found
            }
            seen[nums[i]] = i; // @viz store
        }
        return {}; // @viz notfound
    }
};
