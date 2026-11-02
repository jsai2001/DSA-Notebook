#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> insert(std::vector<std::vector<int>>& intervals, std::vector<int>& newInterval) {
        using Row = std::vector<int>;
        int start = newInterval[0], end = newInterval[1];
        auto endsBefore = [](const Row& iv, int x) { return iv[1] < x; };
        auto startsAfter = [](int x, const Row& iv) { return x < iv[0]; };
        auto left = std::lower_bound(intervals.begin(), intervals.end(), start, endsBefore); // first end >= start
        auto right = std::upper_bound(left, intervals.end(), end, startsAfter); // first start > end
        if (left != right) {
            start = std::min(start, (*left)[0]);
            end = std::max(end, (*(right - 1))[1]);
        }
        std::vector<Row> result(intervals.begin(), left);
        result.push_back({start, end});
        result.insert(result.end(), right, intervals.end());
        return result;
    }
};
