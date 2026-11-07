#include <algorithm>
#include <unordered_map>
#include <vector>
class Solution {
public:
    std::vector<int> topKFrequent(std::vector<int>& nums, int k) {
        std::unordered_map<int, int> count; // value -> how many times it appears // @viz count
        for (int x : nums) ++count[x]; // @viz count
        std::vector<std::pair<int, int>> order(count.begin(), count.end()); // @viz sort
        std::sort(order.begin(), order.end(), [](auto& a, auto& b) { return a.second > b.second; }); // most frequent first // @viz sort
        std::vector<int> ans; // @viz return
        for (int i = 0; i < k; ++i) ans.push_back(order[i].first); // @viz return
        return ans; // @viz return
    }
};
