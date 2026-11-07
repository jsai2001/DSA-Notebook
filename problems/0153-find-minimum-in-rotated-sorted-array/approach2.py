class Solution(object):
    def findMin(self, nums):
        if nums[0] <= nums[-1]:  # not rotated (or one number): the first is smallest  # @viz sorted
            return nums[0]  # @viz sorted
        # Rotated: numbers before the drop are >= nums[0], numbers after it are < nums[0].
        # The minimum is the first number smaller than nums[0].
        lo, hi = 1, len(nums) - 1  # @viz init
        while lo < hi:  # @viz loop
            mid = (lo + hi) // 2  # @viz mid
            if nums[mid] >= nums[0]:  # still in the left part: the drop is after mid  # @viz right
                lo = mid + 1  # @viz right
            else:  # mid is after the drop: the minimum is mid or before it  # @viz left
                hi = mid  # @viz left
        return nums[lo]  # @viz return
