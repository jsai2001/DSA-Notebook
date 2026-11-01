class Solution(object):
    def search(self, nums, target):
        lo, hi = 0, len(nums) - 1  # @viz init
        while lo <= hi:  # @viz loop
            mid = (lo + hi) // 2  # @viz loop
            if nums[mid] == target:  # @viz found
                return mid  # @viz found
            # one of the two halves is always sorted; <= so that lo == mid counts as sorted
            if nums[lo] <= nums[mid]:  # the left half lo..mid is sorted  # @viz left-sorted
                if nums[lo] <= target < nums[mid]:  # target fits inside it  # @viz in-left, not-left
                    hi = mid - 1  # @viz in-left
                else:  # @viz not-left
                    lo = mid + 1  # @viz not-left
            else:  # the right half mid..hi is sorted  # @viz right-sorted
                if nums[mid] < target <= nums[hi]:  # target fits inside it  # @viz in-right, not-right
                    lo = mid + 1  # @viz in-right
                else:  # @viz not-right
                    hi = mid - 1  # @viz not-right
        return -1  # @viz missing
