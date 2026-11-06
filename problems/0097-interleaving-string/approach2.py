class Solution(object):
    def isInterleave(self, s1, s2, s3):
        m, n = len(s1), len(s2)  # @viz init
        if m + n != len(s3):  # the letters have to add up  # @viz len
            return False  # @viz len
        # dp[i][j]: can the first i letters of s1 and the first j of s2 make the first i + j of s3?
        dp = [[False] * (n + 1) for _ in range(m + 1)]  # @viz init
        dp[0][0] = True  # nothing from either makes the empty start  # @viz init
        for i in range(m + 1):  # @viz loop
            for j in range(n + 1):  # @viz loop
                if i > 0 and s1[i - 1] == s3[i + j - 1] and dp[i - 1][j]:  # the last letter came from s1  # @viz from1
                    dp[i][j] = True  # @viz from1
                if j > 0 and s2[j - 1] == s3[i + j - 1] and dp[i][j - 1]:  # or from s2  # @viz from2
                    dp[i][j] = True  # @viz from2
        return dp[m][n]  # @viz answer
