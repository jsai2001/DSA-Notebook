class Solution(object):
    def insert(self, intervals, newInterval):
        start, end = newInterval  # @viz init
        result, i, n = [], 0, len(intervals)  # @viz init
        while i < n and intervals[i][1] < start:  # ends before the new one starts: keep it as it is  # @viz before
            result.append(list(intervals[i]))  # @viz before
            i += 1  # @viz before
        while i < n and intervals[i][0] <= end:  # starts before the new one ends: they overlap, so absorb it  # @viz overlap
            start = min(start, intervals[i][0])  # @viz overlap
            end = max(end, intervals[i][1])  # @viz overlap
            i += 1  # @viz overlap
        result.append([start, end])  # the new interval, grown to cover everything it touched  # @viz place
        while i < n:  # the rest start after it ends  # @viz after
            result.append(list(intervals[i]))  # @viz after
            i += 1  # @viz after
        return result  # @viz return
