class Solution(object):
    def search(self, nums, target):
        n = len(nums)
        lo, hi = 0, n - 1  # step 1: find the smallest value, where the rotation starts  # @viz pivot
        while lo < hi:  # @viz pivot
            mid = (lo + hi) // 2  # @viz pivot
            if nums[mid] > nums[hi]:  # the drop is to the right of mid  # @viz pivot-right, pivot-left
                lo = mid + 1  # @viz pivot-right
            else:  # mid could be the smallest, or the drop is to its left  # @viz pivot-left
                hi = mid  # @viz pivot-left
        pivot = lo  # nums[pivot:] and nums[:pivot] are both sorted  # @viz side
        if nums[pivot] <= target <= nums[n - 1]:  # step 2: which sorted part could hold target?  # @viz side-right, side-left
            lo, hi = pivot, n - 1  # @viz side-right
        else:  # @viz side-left
            lo, hi = 0, pivot - 1  # @viz side-left
        while lo <= hi:  # step 3: an ordinary binary search on that part  # @viz search
            mid = (lo + hi) // 2  # @viz search
            if nums[mid] == target:  # @viz found, higher, lower
                return mid  # @viz found
            if nums[mid] < target:  # @viz higher, lower
                lo = mid + 1  # @viz higher
            else:  # @viz lower
                hi = mid - 1  # @viz lower
        return -1  # @viz missing
