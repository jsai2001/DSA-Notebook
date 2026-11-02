#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {
        std::vector<std::vector<int>> sorted = intervals; // a copy, so the caller's order is kept // @viz sort
        std::sort(sorted.begin(), sorted.end(), [](const std::vector<int>& a, const std::vector<int>& b) { return a[0] < b[0]; }); // by start // @viz sort
        std::vector<std::vector<int>> merged; // @viz sort
        for (const auto& in : sorted) { // @viz each
            if (!merged.empty() && in[0] <= merged.back()[1]) { // overlaps (or touches) the last merged one // @viz extend
                merged.back()[1] = std::max(merged.back()[1], in[1]); // max: it may sit entirely inside // @viz extend
            } else { // @viz new
                merged.push_back(in); // a copy of the pair // @viz new
            }
        }
        return merged; // @viz return
    }
};
