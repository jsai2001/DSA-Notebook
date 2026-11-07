#include <algorithm>
#include <vector>
class Solution {
public:
    int eraseOverlapIntervals(std::vector<std::vector<int>>& intervals) {
        std::sort(intervals.begin(), intervals.end(), [](const auto& x, const auto& y) { return x[0] < y[0]; }); // by start // @viz init
        int removed = 0, end = intervals[0][1]; // end of the last interval kept // @viz init
        for (size_t i = 1; i < intervals.size(); ++i) { // @viz scan
            if (intervals[i][0] >= end) end = intervals[i][1]; // no overlap: keep it // @viz keep
            else { // overlap: one of the two must go; drop the one that ends later // @viz drop
                ++removed; // @viz drop
                end = std::min(end, intervals[i][1]); // @viz drop
            }
        }
        return removed; // @viz return
    }
};
