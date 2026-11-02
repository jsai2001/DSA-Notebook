from bisect import bisect_left, bisect_right
class Solution(object):
    def insert(self, intervals, newInterval):
        start, end = newInterval
        # key= needs Python 3.10+
        left = bisect_left(intervals, start, key=lambda x: x[1])  # first end >= start
        right = bisect_right(intervals, end, key=lambda x: x[0])  # first start > end
        if left < right:
            start = min(start, intervals[left][0])
            end = max(end, intervals[right - 1][1])
        # shares the untouched inner lists with the input
        return intervals[:left] + [[start, end]] + intervals[right:]
