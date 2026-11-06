#include <algorithm>
#include <unordered_set>
#include <vector>
class Solution {
public:
    int longestConsecutive(std::vector<int>& nums) {
        std::unordered_set<int> present(nums.begin(), nums.end()); // @viz init
        int best = 0; // @viz init
        for (int x : nums) { // @viz loop
            int length = 1; // @viz start
            while (present.count(x + length)) { // walk up from every number // @viz walk
                ++length; // @viz walk
            }
            best = std::max(best, length); // @viz best
        }
        return best; // @viz return
    }
};
