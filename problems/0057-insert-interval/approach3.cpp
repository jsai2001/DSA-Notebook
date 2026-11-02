#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> insert(std::vector<std::vector<int>>& intervals, std::vector<int>& newInterval) {
        int start = newInterval[0], end = newInterval[1]; // @viz init
        int lo = 0, hi = (int)intervals.size(); // find left: the first interval that ends at or after start // @viz left
        while (lo < hi) { // @viz left
            int mid = lo + (hi - lo) / 2; // @viz left
            if (intervals[mid][1] < start) lo = mid + 1; // @viz left
            else hi = mid; // @viz left
        }
        int left = lo; // @viz left
        hi = (int)intervals.size(); // find right: the first interval that starts after end (it's at or after left) // @viz right
        while (lo < hi) { // @viz right
            int mid = lo + (hi - lo) / 2; // @viz right
            if (intervals[mid][0] <= end) lo = mid + 1; // @viz right
            else hi = mid; // @viz right
        }
        int right = lo; // intervals[left..right-1] are exactly the ones that overlap // @viz right
        if (left < right) { // @viz merge
            start = std::min(start, intervals[left][0]); // only the first and last of them matter // @viz merge
            end = std::max(end, intervals[right - 1][1]); // @viz merge
        }
        std::vector<std::vector<int>> result(intervals.begin(), intervals.begin() + left); // @viz build
        result.push_back({start, end}); // @viz build
        result.insert(result.end(), intervals.begin() + right, intervals.end()); // @viz build
        return result; // @viz build
    }
};
