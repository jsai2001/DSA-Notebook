class Solution(object):
    def longestPalindrome(self, s):
        n = len(s)  # @viz init
        dp = [[False] * n for _ in range(n)]  # dp[i][j]: is s[i..j] a palindrome?  # @viz init
        start, best = 0, 1  # @viz init
        for length in range(1, n + 1):  # @viz cell
            for i in range(n - length + 1):  # @viz cell
                j = i + length - 1  # @viz cell
                if s[i] == s[j] and (length <= 2 or dp[i + 1][j - 1]):  # @viz check
                    dp[i][j] = True  # @viz mark
                    if length > best:  # @viz best
                        start, best = i, length  # @viz best
        return s[start:start + best]  # @viz return
