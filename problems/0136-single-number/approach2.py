class Solution(object):
    def singleNumber(self, nums):
        nums = sorted(nums)  # equal values end up side by side  # @viz sort
        for i in range(0, len(nums) - 1, 2):  # look at pairs (0, 1), (2, 3), ...  # @viz pair
            if nums[i] != nums[i + 1]:  # this pair is broken: nums[i] is the single one  # @viz broken
                return nums[i]  # @viz broken
        return nums[-1]  # every pair matched: the single one is last  # @viz last
