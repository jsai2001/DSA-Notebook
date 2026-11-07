class Solution(object):
    def canPartition(self, nums):
        total = sum(nums)  # @viz init
        if total % 2:  # an odd total can't split into two equal halves  # @viz init
            return False  # @viz init
        half = total // 2  # @viz init
        dp = [True] + [False] * half  # dp[s]: some of the numbers so far add up to s  # @viz init
        for x in nums:  # @viz num
            for s in range(half, x - 1, -1):  # downwards, so x is used at most once  # @viz fill
                if dp[s - x]:  # @viz fill
                    dp[s] = True  # @viz fill
            if dp[half]:  # @viz found
                return True  # @viz found
        return False  # @viz return
