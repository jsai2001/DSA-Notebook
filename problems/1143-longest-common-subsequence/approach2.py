class Solution(object):
    def longestCommonSubsequence(self, text1, text2):
        m, n = len(text1), len(text2)  # @viz init
        dp = [[0] * (n + 1) for _ in range(m + 1)]  # dp[i][j] = LCS of the first i letters and the first j letters  # @viz init
        for i in range(1, m + 1):  # @viz row
            for j in range(1, n + 1):  # @viz cell
                if text1[i - 1] == text2[j - 1]:  # the last letters match: extend the diagonal  # @viz same
                    dp[i][j] = dp[i - 1][j - 1] + 1  # @viz same
                else:  # drop the last letter of one of them  # @viz diff
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])  # @viz diff
        return dp[m][n]  # @viz return
