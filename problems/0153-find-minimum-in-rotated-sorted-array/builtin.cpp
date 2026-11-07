#include <algorithm>
#include <vector>
class Solution {
public:
    int findMin(std::vector<int>& nums) {
        return *std::min_element(nums.begin(), nums.end()); // scans everything: O(n)
    }
};
