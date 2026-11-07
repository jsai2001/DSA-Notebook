class Solution(object):
    def search(self, nums, target):
        lo, hi = 0, len(nums) - 1  # target, if present, is in nums[lo..hi]  # @viz init
        while lo <= hi:  # @viz mid
            mid = (lo + hi) // 2  # @viz mid
            if nums[mid] == target:  # @viz found
                return mid  # @viz found
            if nums[mid] < target:  # too small: drop mid and everything left of it  # @viz right
                lo = mid + 1  # @viz right
            else:  # too big: drop mid and everything right of it  # @viz left
                hi = mid - 1  # @viz left
        return -1  # @viz none
