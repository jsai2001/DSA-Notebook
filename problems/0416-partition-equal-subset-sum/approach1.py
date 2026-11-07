class Solution(object):
    def canPartition(self, nums):
        total = sum(nums)  # @viz init
        if total % 2:  # an odd total can't split into two equal halves  # @viz init
            return False  # @viz init
        def pick(i, left):  # can some of nums[i:] add up to exactly left?  # @viz call
            if left == 0:  # @viz found
                return True  # @viz found
            if i == len(nums) or left < 0:  # @viz dead
                return False  # @viz dead
            return pick(i + 1, left - nums[i]) or pick(i + 1, left)  # take nums[i], or skip it  # @viz call
        return pick(0, total // 2)  # @viz return
