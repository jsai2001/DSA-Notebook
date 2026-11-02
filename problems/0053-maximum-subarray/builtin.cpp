#include <algorithm>
#include <numeric>
#include <vector>
class Solution {
public:
    int maxSubArray(std::vector<int>& nums) {
        std::vector<int> run(nums.size()); // run[i]: best sum of a subarray ending at i
        std::partial_sum(nums.begin(), nums.end(), run.begin(), [](int r, int x) { return std::max(x, r + x); });
        return *std::max_element(run.begin(), run.end());
    }
};
