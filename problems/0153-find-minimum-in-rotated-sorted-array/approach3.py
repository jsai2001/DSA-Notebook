class Solution(object):
    def findMin(self, nums):
        lo, hi = 0, len(nums) - 1  # @viz init
        while lo < hi:  # stop when one number is left: that's the minimum  # @viz loop
            mid = (lo + hi) // 2  # @viz mid
            if nums[mid] > nums[hi]:  # the drop is between mid and hi, so the minimum is after mid  # @viz right
                lo = mid + 1  # @viz right
            else:  # mid..hi is sorted, so the minimum is mid or to its left  # @viz left
                hi = mid  # not mid - 1: mid itself may be the minimum  # @viz left
        return nums[lo]  # @viz return
