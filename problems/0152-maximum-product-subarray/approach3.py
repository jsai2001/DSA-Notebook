class Solution(object):
    def maxProduct(self, nums):
        hi = lo = best = nums[0]  # largest and smallest product of a subarray ending here  # @viz init
        for x in nums[1:]:  # @viz loop
            if x < 0:  # a negative number turns the largest into the smallest, and back  # @viz swap
                hi, lo = lo, hi  # @viz swap
            hi = max(x, hi * x)  # start fresh at x, or extend  # @viz update
            lo = min(x, lo * x)  # @viz update
            best = max(best, hi)  # @viz best
        return best  # @viz return
