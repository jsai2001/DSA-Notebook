#include <algorithm>
#include <climits>
#include <vector>
class Solution {
public:
    int eraseOverlapIntervals(std::vector<std::vector<int>>& intervals) {
        std::sort(intervals.begin(), intervals.end(), [](const auto& x, const auto& y) { return x[1] < y[1]; }); // by end // @viz init
        int kept = 0, end = INT_MIN; // end of the last interval kept // @viz init
        for (auto& iv : intervals) { // @viz scan
            if (iv[0] >= end) { // it fits after the last one kept: keep it; it ends the earliest of what's left // @viz keep
                ++kept; // @viz keep
                end = iv[1]; // @viz keep
            }
        }
        return intervals.size() - kept; // @viz return
    }
};
