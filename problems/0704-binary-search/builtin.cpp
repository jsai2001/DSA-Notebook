#include <algorithm>
#include <vector>
class Solution {
public:
    int search(std::vector<int>& nums, int target) {
        auto it = std::lower_bound(nums.begin(), nums.end(), target); // the first value >= target
        return it != nums.end() && *it == target ? it - nums.begin() : -1;
    }
};
