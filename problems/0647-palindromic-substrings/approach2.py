class Solution(object):
    def countSubstrings(self, s):
        n = len(s)  # @viz init
        pal = [[False] * n for _ in range(n)]  # pal[i][j]: is s[i..j] a palindrome?  # @viz init
        count = 0  # @viz init
        for i in range(n - 1, -1, -1):  # i from the end, so pal[i + 1] is ready  # @viz row
            for j in range(i, n):  # @viz cell
                # Same ends, and the inside s[i+1..j-1] is a palindrome (or has 0-1 letters).
                if s[i] == s[j] and (j - i < 2 or pal[i + 1][j - 1]):  # @viz cell
                    pal[i][j] = True  # @viz count
                    count += 1  # @viz count
        return count  # @viz return
