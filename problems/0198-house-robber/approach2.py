class Solution(object):
    def rob(self, nums):
        n = len(nums)  # @viz init
        dp = [0] * (n + 1)  # dp[i] = the most from the first i houses  # @viz init
        dp[1] = nums[0]  # @viz init
        for i in range(2, n + 1):  # @viz loop
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1])  # leave house i - 1, or rob it on top of dp[i - 2]  # @viz choose
        return dp[n]  # @viz return
