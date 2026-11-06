from itertools import groupby
class Solution(object):
    def longestConsecutive(self, nums):
        vals = sorted(set(nums))  # no repeats, in order
        # In a run like 4, 5, 6 at positions 2, 3, 4, value - position stays the same (2),
        # so groupby puts each run in its own group.
        runs = groupby(enumerate(vals), key=lambda p: p[1] - p[0])
        return max((len(list(g)) for _, g in runs), default=0)
