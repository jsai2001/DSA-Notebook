class Solution(object):
    def maxSubArray(self, nums):
        best = nums[0]  # not 0: every number may be negative  # @viz init
        for i in range(len(nums)):  # every start  # @viz start
            total = 0  # @viz start
            for j in range(i, len(nums)):  # every end, adding one number at a time  # @viz extend
                total += nums[j]  # sum of nums[i..j]  # @viz extend
                best = max(best, total)  # @viz extend
        return best  # @viz return
