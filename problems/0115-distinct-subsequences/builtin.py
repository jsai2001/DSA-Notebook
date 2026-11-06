from functools import cache
class Solution(object):
    def numDistinct(self, s, t):
        @cache  # remembers count(i, j): at most (m + 1)(n + 1) different questions
        def count(i, j):
            if j == len(t):
                return 1
            if len(s) - i < len(t) - j:
                return 0
            return count(i + 1, j) + (count(i + 1, j + 1) if s[i] == t[j] else 0)
        return count(0, 0)
