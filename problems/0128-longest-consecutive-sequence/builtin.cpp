#include <algorithm>
#include <vector>
class Solution {
public:
    int longestConsecutive(std::vector<int>& nums) {
        std::sort(nums.begin(), nums.end());
        nums.erase(std::unique(nums.begin(), nums.end()), nums.end()); // drop repeats
        int best = 0;
        for (size_t i = 0, j; i < nums.size(); i = j) {
            // j = end of the run that starts at i (each next value is one more)
            for (j = i + 1; j < nums.size() && nums[j] == nums[j - 1] + 1; ++j) {}
            best = std::max(best, static_cast<int>(j - i));
        }
        return best;
    }
};
