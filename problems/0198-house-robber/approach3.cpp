#include <algorithm>
#include <vector>
class Solution {
public:
    int rob(std::vector<int>& nums) {
        int prev = 0, cur = 0; // the best up to two houses back, and up to the last house // @viz init
        for (int x : nums) { // @viz loop
            int next = std::max(cur, prev + x); // skip this house, or rob it on top of prev // @viz choose
            prev = cur; // @viz choose
            cur = next; // @viz choose
        }
        return cur; // @viz return
    }
};
