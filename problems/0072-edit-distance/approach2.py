class Solution(object):
    def minDistance(self, word1, word2):
        m, n = len(word1), len(word2)  # @viz init
        # dp[i][j]: edits to turn the first i letters of word1 into the first j letters of word2
        dp = [[0] * (n + 1) for _ in range(m + 1)]  # @viz init
        for i in range(m + 1):  # into "": delete all i letters  # @viz base
            dp[i][0] = i  # @viz base
        for j in range(n + 1):  # from "": insert all j letters  # @viz base
            dp[0][j] = j  # @viz base
        for i in range(1, m + 1):  # @viz fill
            for j in range(1, n + 1):  # @viz fill
                if word1[i - 1] == word2[j - 1]:  # same last letter: no edit for it  # @viz same
                    dp[i][j] = dp[i - 1][j - 1]  # @viz same
                else:  # @viz edit
                    dp[i][j] = 1 + min(dp[i - 1][j - 1],  # replace  # @viz edit
                                       dp[i - 1][j],  # delete word1's letter  # @viz edit
                                       dp[i][j - 1])  # insert word2's letter  # @viz edit
        return dp[m][n]  # @viz answer
