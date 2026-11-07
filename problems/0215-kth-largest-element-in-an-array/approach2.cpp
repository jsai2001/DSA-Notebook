#include <functional>
#include <queue>
#include <vector>
class Solution {
public:
    int findKthLargest(std::vector<int>& nums, int k) {
        std::priority_queue<int, std::vector<int>, std::greater<int>> heap; // min-heap of the k biggest values seen so far // @viz init
        for (int x : nums) { // @viz push
            heap.push(x); // @viz push
            if ((int)heap.size() > k) heap.pop(); // one too many: drop the smallest // @viz pop
        }
        return heap.top(); // the smallest of the k biggest is the k-th biggest // @viz return
    }
};
