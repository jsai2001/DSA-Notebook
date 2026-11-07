#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {
        std::vector<int> res; // @viz init
        for (int i = 0; i + k <= (int)nums.size(); ++i) // every window start // @viz window
            res.push_back(*std::max_element(nums.begin() + i, nums.begin() + i + k)); // look at all k values again // @viz window
        return res; // @viz return
    }
};
