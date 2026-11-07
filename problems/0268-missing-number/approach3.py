class Solution(object):
    def missingNumber(self, nums):
        res = len(nums)  # start with n, the one index that has no slot  # @viz init
        for i, x in enumerate(nums):  # @viz xor
            res ^= i ^ x  # every number that's present appears twice (as an index and a value) and cancels  # @viz xor
        return res  # only the missing one is left  # @viz return
