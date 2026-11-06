class Solution(object):
    def longestConsecutive(self, nums):
        present = set(nums)  # @viz init
        best = 0  # @viz init
        for x in present:  # the set, so a repeated start is walked only once  # @viz loop
            if x - 1 in present:  # not the start of a run: its start will cover it  # @viz skip
                continue  # @viz skip
            length = 1  # @viz start
            while x + length in present:  # @viz walk
                length += 1  # @viz walk
            best = max(best, length)  # @viz best
        return best  # @viz return
