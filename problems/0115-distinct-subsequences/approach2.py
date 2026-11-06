class Solution(object):
    def numDistinct(self, s, t):
        m, n = len(s), len(t)  # @viz init
        # dp[i][j]: ways to spell the first j letters of t using the first i letters of s
        dp = [[0] * (n + 1) for _ in range(m + 1)]  # @viz init
        for i in range(m + 1):  # @viz init
            dp[i][0] = 1  # the empty start of t: one way (use nothing)  # @viz init
        for i in range(1, m + 1):  # @viz loop
            for j in range(1, n + 1):  # @viz loop
                dp[i][j] = dp[i - 1][j]  # don't use s[i-1]  # @viz skip
                if s[i - 1] == t[j - 1]:  # @viz use
                    dp[i][j] += dp[i - 1][j - 1]  # use s[i-1] as the j-th letter of t  # @viz use
        return dp[m][n]  # @viz answer
