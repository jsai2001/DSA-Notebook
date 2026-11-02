class Solution(object):
    def merge(self, intervals):
        intervals = sorted(intervals, key=lambda x: x[0])  # by start (a sorted copy)  # @viz sort
        merged = []  # @viz sort
        for start, end in intervals:  # @viz each
            if merged and start <= merged[-1][1]:  # overlaps (or touches) the last merged one  # @viz extend
                merged[-1][1] = max(merged[-1][1], end)  # max: it may sit entirely inside  # @viz extend
            else:  # @viz new
                merged.append([start, end])  # a new list, so the input's lists aren't changed  # @viz new
        return merged  # @viz return
