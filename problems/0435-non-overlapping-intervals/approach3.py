class Solution(object):
    def eraseOverlapIntervals(self, intervals):
        intervals = sorted(intervals, key=lambda x: x[1])  # by end  # @viz init
        kept, end = 0, float("-inf")  # end of the last interval kept  # @viz init
        for s, e in intervals:  # @viz scan
            if s >= end:  # it fits after the last one kept: keep it; it ends the earliest of what's left  # @viz keep
                kept += 1  # @viz keep
                end = e  # @viz keep
        return len(intervals) - kept  # @viz return
