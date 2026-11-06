#include <algorithm>
#include <vector>
class Solution {
public:
    int longestConsecutive(std::vector<int>& nums) {
        if (nums.empty()) { // @viz init
            return 0; // @viz init
        }
        std::sort(nums.begin(), nums.end()); // sorts the input in place // @viz sort
        int best = 1, cur = 1; // @viz sort
        for (size_t i = 1; i < nums.size(); ++i) { // @viz loop
            if (nums[i] == nums[i - 1]) { // a repeat doesn't break the run // @viz dup
                continue; // @viz dup
            }
            if (nums[i] == nums[i - 1] + 1) { // at most 10^9 + 1: fits in int // @viz extend
                ++cur; // @viz extend
            } else { // @viz reset
                cur = 1; // a gap: a new run starts here // @viz reset
            }
            best = std::max(best, cur); // @viz best
        }
        return best; // @viz return
    }
};
