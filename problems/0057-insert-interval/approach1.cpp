#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> insert(std::vector<std::vector<int>>& intervals, std::vector<int>& newInterval) {
        std::vector<std::vector<int>> everything = intervals; // add it, then sort by start again // @viz sort
        everything.push_back(newInterval); // @viz sort
        std::sort(everything.begin(), everything.end()); // @viz sort
        std::vector<std::vector<int>> merged; // @viz sort
        for (const auto& in : everything) { // @viz each
            if (!merged.empty() && in[0] <= merged.back()[1]) { // overlaps (or touches) the last merged one // @viz extend
                merged.back()[1] = std::max(merged.back()[1], in[1]); // @viz extend
            } else { // @viz new
                merged.push_back(in); // @viz new
            }
        }
        return merged; // @viz return
    }
};
