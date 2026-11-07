class Solution(object):
    def rob(self, nums):
        n = len(nums)  # @viz init
        if n == 1:  # one house: it has no neighbours  # @viz one
            return nums[0]  # @viz one
        def best_range(lo, hi):  # House Robber on nums[lo..hi]  # @viz range
            m = hi - lo + 1  # @viz range
            dp = [0] * (m + 1)  # dp[i] = the most from the first i houses of the range  # @viz range
            dp[1] = nums[lo]  # @viz range
            for i in range(2, m + 1):  # @viz loop
                dp[i] = max(dp[i - 1], dp[i - 2] + nums[lo + i - 1])  # @viz choose
            return dp[m]  # @viz range
        return max(best_range(0, n - 2), best_range(1, n - 1))  # without the last house, or without the first  # @viz answer
