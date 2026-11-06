class Solution(object):
    def isInterleave(self, s1, s2, s3):
        m, n = len(s1), len(s2)  # @viz init
        if m + n != len(s3):  # the letters have to add up  # @viz len
            return False  # @viz len
        dp = [False] * (n + 1)  # one row of the table; dp[j] is row i once row i is done  # @viz init
        for i in range(m + 1):  # @viz loop
            for j in range(n + 1):  # @viz loop
                if i == 0 and j == 0:  # @viz init
                    dp[j] = True  # @viz init
                    continue  # @viz init
                from1 = i > 0 and dp[j] and s1[i - 1] == s3[i + j - 1]  # dp[j] still holds the row above  # @viz from1
                from2 = j > 0 and dp[j - 1] and s2[j - 1] == s3[i + j - 1]  # dp[j - 1] is already this row  # @viz from2
                dp[j] = from1 or from2  # @viz store
        return dp[n]  # @viz answer
