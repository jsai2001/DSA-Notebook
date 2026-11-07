class Solution(object):
    def eraseOverlapIntervals(self, intervals):
        intervals = sorted(intervals, key=lambda x: x[0])  # by start  # @viz init
        removed, end = 0, intervals[0][1]  # end of the last interval kept  # @viz init
        for s, e in intervals[1:]:  # @viz scan
            if s >= end:  # no overlap: keep it  # @viz keep
                end = e  # @viz keep
            else:  # overlap: one of the two must go; drop the one that ends later  # @viz drop
                removed += 1  # @viz drop
                end = min(end, e)  # @viz drop
        return removed  # @viz return
