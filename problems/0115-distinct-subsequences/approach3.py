class Solution(object):
    def numDistinct(self, s, t):
        n = len(t)  # @viz init
        dp = [1] + [0] * n  # one row: dp[j] = ways to spell t[:j] with the letters of s seen so far  # @viz init
        for ch in s:  # @viz loop
            # right to left, so dp[j - 1] still holds the value from before this letter
            for j in range(n, 0, -1):  # @viz loop
                if t[j - 1] == ch:  # @viz use
                    dp[j] += dp[j - 1]  # @viz use
        return dp[n]  # @viz answer
