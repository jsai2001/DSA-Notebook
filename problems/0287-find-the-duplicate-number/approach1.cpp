#include <vector>
class Solution {
public:
    int findDuplicate(std::vector<int>& nums) {
        std::vector<char> seen(nums.size(), 0); // values are 1..n, so an array of flags works as the set // @viz init
        for (int x : nums) { // @viz loop
            if (seen[x]) return x; // met before // @viz found
            seen[x] = 1; // @viz add
        }
        return -1; // not reached
    }
};
