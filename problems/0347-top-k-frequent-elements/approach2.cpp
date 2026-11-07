#include <functional>
#include <queue>
#include <unordered_map>
#include <vector>
class Solution {
public:
    std::vector<int> topKFrequent(std::vector<int>& nums, int k) {
        std::unordered_map<int, int> count; // value -> how many times it appears // @viz count
        for (int x : nums) ++count[x]; // @viz count
        // min-heap of (count, value): the k most frequent so far
        std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<>> heap; // @viz push
        for (auto& [x, c] : count) { // @viz push
            heap.push({c, x}); // @viz push
            if ((int)heap.size() > k) heap.pop(); // one too many: drop the least frequent // @viz pop
        }
        std::vector<int> ans; // @viz return
        for (; !heap.empty(); heap.pop()) ans.push_back(heap.top().second); // @viz return
        return ans; // @viz return
    }
};
