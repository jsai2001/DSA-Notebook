class Solution(object):
    def isMatch(self, s, p):
        m, n = len(s), len(p)  # @viz init
        # dp[i][j]: does s[:i] (first i chars) match p[:j]?
        dp = [[False] * (n + 1) for _ in range(m + 1)]  # @viz init
        dp[0][0] = True  # empty matches empty  # @viz init
        for j in range(2, n + 1):  # @viz empty
            if p[j - 1] == '*':  # "a*b*" can match ""  # @viz empty
                dp[0][j] = dp[0][j - 2]  # @viz empty
        for i in range(1, m + 1):  # @viz cell
            for j in range(1, n + 1):  # @viz cell
                if p[j - 1] == '*':  # @viz star
                    zero = dp[i][j - 2]  # "x*" used zero times  # @viz star
                    more = p[j - 2] in (s[i - 1], '.') and dp[i - 1][j]  # one more x  # @viz star
                    dp[i][j] = zero or more  # @viz star
                else:
                    dp[i][j] = p[j - 1] in (s[i - 1], '.') and dp[i - 1][j - 1]  # @viz single
        return dp[m][n]  # @viz return
