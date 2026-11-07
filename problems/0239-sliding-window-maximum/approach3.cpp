#include <deque>
#include <vector>
class Solution {
public:
    std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {
        std::deque<int> dq; // indexes whose values go down from front to back; the front is the window's max // @viz init
        std::vector<int> res; // @viz init
        for (int i = 0; i < (int)nums.size(); ++i) { // @viz step
            while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back(); // smaller values behind can never be a max again // @viz pop
            dq.push_back(i); // @viz push
            if (dq.front() <= i - k) dq.pop_front(); // the front slid out of the window // @viz out
            if (i >= k - 1) res.push_back(nums[dq.front()]); // @viz record
        }
        return res; // @viz return
    }
};
