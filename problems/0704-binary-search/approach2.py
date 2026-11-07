class Solution(object):
    def search(self, nums, target):
        def find(lo, hi):  # target's index within nums[lo..hi], or -1  # @viz call
            if lo > hi:  # nothing left to search  # @viz none
                return -1  # @viz none
            mid = (lo + hi) // 2  # @viz mid
            if nums[mid] == target:  # @viz found
                return mid  # @viz found
            if nums[mid] < target:  # target is bigger: it can only be on the right  # @viz right
                return find(mid + 1, hi)  # @viz right
            return find(lo, mid - 1)  # smaller: only on the left  # @viz left
        return find(0, len(nums) - 1)  # @viz call
