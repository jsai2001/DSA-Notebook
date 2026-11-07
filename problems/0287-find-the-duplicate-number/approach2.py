class Solution(object):
    def findDuplicate(self, nums):
        lo, hi = 1, len(nums) - 1  # the duplicate is a value in 1..n  # @viz init
        while lo < hi:  # @viz guess
            mid = (lo + hi) // 2  # @viz guess
            count = sum(1 for x in nums if x <= mid)  # how many values are <= mid?  # @viz count
            if count > mid:  # more than mid values fit in 1..mid: a repeat is in there  # @viz left
                hi = mid  # @viz left
            else:  # @viz right
                lo = mid + 1  # @viz right
        return lo  # @viz return
