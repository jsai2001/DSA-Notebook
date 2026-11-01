from bisect import bisect_left
class Solution(object):
    def search(self, nums, target):
        lo, hi = 0, len(nums) - 1
        while lo < hi:  # find where the rotation starts (the smallest value)
            mid = (lo + hi) // 2
            if nums[mid] > nums[hi]:
                lo = mid + 1
            else:
                hi = mid
        # nums[:lo] holds the values >= nums[0]; nums[lo:] holds the smaller ones
        start, end = (0, lo) if lo > 0 and target >= nums[0] else (lo, len(nums))
        i = bisect_left(nums, target, start, end)  # the library's binary search on that part
        return i if i < end and nums[i] == target else -1
