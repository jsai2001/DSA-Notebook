class Solution(object):
    def twoSum(self, nums, target):
        seen = {}  # {value: index}  # @viz init
        for i, num in enumerate(nums):
            complement = target - num  # @viz complement
            if complement in seen:  # @viz check
                return [seen[complement], i]  # @viz found
            seen[num] = i  # @viz store
