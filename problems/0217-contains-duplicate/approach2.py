class Solution(object):
    def containsDuplicate(self, nums):
        nums = sorted(nums)  # equal values end up side by side  # @viz sort
        for i in range(1, len(nums)):  # @viz scan
            if nums[i] == nums[i - 1]:  # @viz found
                return True  # @viz found
        return False  # @viz none
