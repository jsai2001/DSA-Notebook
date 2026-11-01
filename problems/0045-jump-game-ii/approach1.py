class Solution(object):
    def jump(self, nums):
        n = len(nums)
        dp = [n] * n  # dp[i]: fewest jumps to reach i (n means "not reached yet")  # @viz init
        dp[0] = 0  # @viz init
        for i in range(n):  # @viz from
            for j in range(i + 1, min(n - 1, i + nums[i]) + 1):  # every index one jump from i  # @viz relax
                dp[j] = min(dp[j], dp[i] + 1)  # @viz relax
        return dp[n - 1]  # @viz return
