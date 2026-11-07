class Solution(object):
    def missingNumber(self, nums):
        seen = set(nums)  # @viz set
        for x in range(len(nums) + 1):  # try 0, 1, ..., n  # @viz check
            if x not in seen:  # @viz found
                return x  # @viz found
