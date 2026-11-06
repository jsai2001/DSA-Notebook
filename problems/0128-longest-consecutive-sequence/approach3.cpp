#include <algorithm>
#include <unordered_set>
#include <vector>
class Solution {
public:
    int longestConsecutive(std::vector<int>& nums) {
        std::unordered_set<int> present(nums.begin(), nums.end()); // @viz init
        int best = 0; // @viz init
        for (int x : present) { // the set, so a repeated start is walked only once // @viz loop
            if (present.count(x - 1)) { // not the start of a run: its start will cover it // @viz skip
                continue; // @viz skip
            }
            int length = 1; // @viz start
            while (present.count(x + length)) { // x + length <= 10^9 + 10^5: fits in int // @viz walk
                ++length; // @viz walk
            }
            best = std::max(best, length); // @viz best
        }
        return best; // @viz return
    }
};
