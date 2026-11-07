#include <unordered_map>
#include <vector>
class Solution {
public:
    std::vector<int> topKFrequent(std::vector<int>& nums, int k) {
        std::unordered_map<int, int> count; // value -> how many times it appears // @viz count
        for (int x : nums) ++count[x]; // @viz count
        std::vector<std::vector<int>> bucket(nums.size() + 1); // bucket[c] = values seen exactly c times // @viz bucket
        for (auto& [x, c] : count) bucket[c].push_back(x); // @viz bucket
        std::vector<int> ans; // @viz take
        for (int c = nums.size(); c > 0; --c) // biggest count first // @viz take
            for (int x : bucket[c]) { // @viz take
                ans.push_back(x); // @viz take
                if ((int)ans.size() == k) return ans; // @viz return
            }
        return ans; // never reached: k is at most the number of distinct values // @viz return
    }
};
