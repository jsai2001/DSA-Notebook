#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> insert(std::vector<std::vector<int>>& intervals, std::vector<int>& newInterval) {
        int start = newInterval[0], end = newInterval[1]; // @viz init
        std::vector<std::vector<int>> result; // @viz init
        size_t i = 0, n = intervals.size(); // @viz init
        while (i < n && intervals[i][1] < start) { // ends before the new one starts: keep it as it is // @viz before
            result.push_back(intervals[i]); // @viz before
            ++i; // @viz before
        }
        while (i < n && intervals[i][0] <= end) { // starts before the new one ends: they overlap, so absorb it // @viz overlap
            start = std::min(start, intervals[i][0]); // @viz overlap
            end = std::max(end, intervals[i][1]); // @viz overlap
            ++i; // @viz overlap
        }
        result.push_back({start, end}); // the new interval, grown to cover everything it touched // @viz place
        while (i < n) { // the rest start after it ends // @viz after
            result.push_back(intervals[i]); // @viz after
            ++i; // @viz after
        }
        return result; // @viz return
    }
};
