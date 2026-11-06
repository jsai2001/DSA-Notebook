class Solution(object):
    def singleNumber(self, nums):
        result = 0  # x ^ 0 = x  # @viz init
        for x in nums:  # @viz xor
            result ^= x  # x ^ x = 0, so every pair cancels out  # @viz xor
        return result  # only the single number is left  # @viz return
