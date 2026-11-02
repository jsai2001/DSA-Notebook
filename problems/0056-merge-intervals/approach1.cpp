#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {
        std::vector<std::vector<int>> merged; // disjoint intervals so far, in no particular order // @viz init
        for (const auto& in : intervals) { // @viz each
            int start = in[0], end = in[1]; // @viz each
            std::vector<std::vector<int>> keep; // the ones the new interval doesn't touch // @viz each
            for (auto& m : merged) { // @viz check
                if (m[0] <= end && start <= m[1]) { // they overlap (touching counts) // @viz check
                    start = std::min(start, m[0]); // absorb it // @viz absorb
                    end = std::max(end, m[1]); // @viz absorb
                } else { // @viz check
                    keep.push_back(std::move(m)); // moved, not copied: merged is replaced below // @viz check
                }
            }
            keep.push_back({start, end}); // @viz add
            merged = std::move(keep); // @viz add
        }
        std::sort(merged.begin(), merged.end()); // in order of start, like the other approaches // @viz return
        return merged; // @viz return
    }
};
