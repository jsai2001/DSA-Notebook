class Solution(object):
    def rob(self, nums):
        prev, cur = 0, 0  # the best up to two houses back, and up to the last house  # @viz init
        for x in nums:  # @viz loop
            prev, cur = cur, max(cur, prev + x)  # skip this house, or rob it on top of prev  # @viz choose
        return cur  # @viz return
