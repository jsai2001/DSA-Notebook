#include <algorithm>
#include <vector>
class Solution {
public:
    int rob(std::vector<int>& nums) {
        const int n = nums.size(); // @viz one
        if (n == 1) return nums[0]; // one house: it has no neighbours // @viz one
        return std::max(bestLine(nums, 0, n - 2), bestLine(nums, 1, n - 1)); // the first and last houses touch: leave out one of them // @viz answer
    }
private:
    int bestLine(const std::vector<int>& nums, int lo, int hi) { // House Robber on nums[lo..hi], a straight street // @viz range
        int prev = 0, cur = 0; // @viz range
        for (int i = lo; i <= hi; ++i) { // @viz loop
            int next = std::max(cur, prev + nums[i]); // skip this house, or rob it on top of prev // @viz choose
            prev = cur; // @viz choose
            cur = next; // @viz choose
        }
        return cur; // @viz range
    }
};
