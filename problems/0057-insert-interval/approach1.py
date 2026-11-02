class Solution(object):
    def insert(self, intervals, newInterval):
        everything = sorted(intervals + [newInterval])  # add it, then sort by start again  # @viz sort
        merged = []  # @viz sort
        for start, end in everything:  # @viz each
            if merged and start <= merged[-1][1]:  # overlaps (or touches) the last merged one  # @viz extend
                merged[-1][1] = max(merged[-1][1], end)  # @viz extend
            else:  # @viz new
                merged.append([start, end])  # a new list, so the input's lists aren't changed  # @viz new
        return merged  # @viz return
