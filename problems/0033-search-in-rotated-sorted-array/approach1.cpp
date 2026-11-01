#include <vector>
class Solution {
public:
    int search(std::vector<int>& nums, int target) {
        for (int i = 0; i < (int)nums.size(); ++i) { // look at every value, left to right // @viz loop
            if (nums[i] == target) return i; // @viz check, found
        }
        return -1; // not in the array // @viz missing
    }
};
