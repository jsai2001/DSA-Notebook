#include <algorithm>
#include <vector>
class Solution {
public:
    int rob(std::vector<int>& nums) {
        memo.assign(nums.size(), -1); // i -> the most you can take from houses i, i + 1, ... (-1 = not known yet) // @viz init
        return best(nums, 0); // @viz answer
    }
private:
    std::vector<int> memo;
    int best(const std::vector<int>& nums, int i) { // @viz call
        if (i >= (int)nums.size()) return 0; // no houses left // @viz base
        if (memo[i] < 0) // @viz memo
            memo[i] = std::max(best(nums, i + 1), nums[i] + best(nums, i + 2)); // skip house i, or rob it and skip i + 1 // @viz choose
        return memo[i]; // @viz memo
    }
};
