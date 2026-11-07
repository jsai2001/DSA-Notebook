#include <queue>
#include <utility>
#include <vector>
class Solution {
public:
    std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {
        std::priority_queue<std::pair<int, int>> heap; // (value, index): the biggest value is on top // @viz init
        std::vector<int> res; // @viz init
        for (int i = 0; i < (int)nums.size(); ++i) { // @viz push
            heap.push({nums[i], i}); // @viz push
            if (i >= k - 1) { // a full window ends at i // @viz drop
                while (heap.top().second <= i - k) heap.pop(); // the top has slid out of the window: throw it away now // @viz drop
                res.push_back(heap.top().first); // @viz top
            }
        }
        return res; // @viz return
    }
};
