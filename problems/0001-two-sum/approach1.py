class Solution(object):
    def twoSum(self, nums, target):
        for i in range(len(nums)):  # @viz outer
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:  # @viz check
                    return [i, j]  # @viz found
