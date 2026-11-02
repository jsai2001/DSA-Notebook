class Solution(object):
    def insert(self, intervals, newInterval):
        start, end = newInterval  # @viz init
        lo, hi = 0, len(intervals)  # find left: the first interval that ends at or after start  # @viz left
        while lo < hi:  # @viz left
            mid = (lo + hi) // 2  # @viz left
            if intervals[mid][1] < start:  # @viz left
                lo = mid + 1  # @viz left
            else:  # @viz left
                hi = mid  # @viz left
        left = lo  # @viz left
        hi = len(intervals)  # find right: the first interval that starts after end (it's at or after left)  # @viz right
        while lo < hi:  # @viz right
            mid = (lo + hi) // 2  # @viz right
            if intervals[mid][0] <= end:  # @viz right
                lo = mid + 1  # @viz right
            else:  # @viz right
                hi = mid  # @viz right
        right = lo  # intervals[left:right] are exactly the ones that overlap  # @viz right
        if left < right:  # @viz merge
            start = min(start, intervals[left][0])  # only the first and last of them matter  # @viz merge
            end = max(end, intervals[right - 1][1])  # @viz merge
        before = [list(x) for x in intervals[:left]]  # @viz build
        after = [list(x) for x in intervals[right:]]  # @viz build
        return before + [[start, end]] + after  # @viz build
