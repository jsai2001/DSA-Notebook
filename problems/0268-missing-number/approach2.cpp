#include <vector>
class Solution {
public:
    int missingNumber(std::vector<int>& nums) {
        const int n = nums.size(); // @viz set
        std::vector<char> seen(n + 1, 0); // the values are 0..n, so an array works as the set // @viz set
        for (int x : nums) seen[x] = 1; // @viz set
        for (int x = 0; x <= n; ++x) // try 0, 1, ..., n // @viz check
            if (!seen[x]) return x; // @viz found
        return -1; // not reached
    }
};
