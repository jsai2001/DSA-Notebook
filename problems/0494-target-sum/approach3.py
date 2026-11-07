class Solution(object):
    def findTargetSumWays(self, nums, target):
        total = sum(nums)  # plus part P minus minus part N = target, and P + N = total, so P = (total + target) / 2  # @viz init
        if abs(target) > total or (total + target) % 2:  # @viz init
            return 0  # @viz init
        p = (total + target) // 2  # @viz init
        dp = [1] + [0] * p  # dp[s]: ways to pick some numbers so far that add up to s  # @viz init
        for x in nums:  # @viz num
            for s in range(p, x - 1, -1):  # downwards, so x is used at most once  # @viz fill
                dp[s] += dp[s - x]  # @viz fill
        return dp[p]  # @viz return
