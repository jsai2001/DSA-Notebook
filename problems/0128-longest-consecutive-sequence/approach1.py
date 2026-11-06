class Solution(object):
    def longestConsecutive(self, nums):
        present = set(nums)  # @viz init
        best = 0  # @viz init
        for x in nums:  # @viz loop
            length = 1  # @viz start
            while x + length in present:  # walk up from every number  # @viz walk
                length += 1  # @viz walk
            best = max(best, length)  # @viz best
        return best  # @viz return
