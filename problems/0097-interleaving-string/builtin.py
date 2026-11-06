from functools import cache
class Solution(object):
    def isInterleave(self, s1, s2, s3):
        if len(s1) + len(s2) != len(s3):
            return False
        @cache  # remembers can(i, j): at most (m + 1)(n + 1) different questions
        def can(i, j):
            if i == len(s1) and j == len(s2):
                return True
            k = i + j
            return (i < len(s1) and s1[i] == s3[k] and can(i + 1, j)) or \
                   (j < len(s2) and s2[j] == s3[k] and can(i, j + 1))
        return can(0, 0)
