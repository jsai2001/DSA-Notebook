class Solution(object):
    def findTargetSumWays(self, nums, target):
        def ways(i, total):  # sign choices for nums[i:] that bring total to target  # @viz call
            if i == len(nums):  # every number has a sign  # @viz leaf
                return 1 if total == target else 0  # @viz leaf
            return ways(i + 1, total + nums[i]) + ways(i + 1, total - nums[i])  # + or -  # @viz call
        return ways(0, 0)  # @viz return
