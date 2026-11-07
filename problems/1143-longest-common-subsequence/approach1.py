import sys
from functools import lru_cache
sys.setrecursionlimit(10000)  # the calls can go m + n deep: up to 2000
class Solution(object):
    def longestCommonSubsequence(self, text1, text2):
        @lru_cache(maxsize=None)  # remember lcs(i, j) for each pair  # @viz init
        def lcs(i, j):  # LCS of text1[i:] and text2[j:]  # @viz call
            if i == len(text1) or j == len(text2):  # one of them is used up  # @viz base
                return 0  # @viz base
            if text1[i] == text2[j]:  # same letter: take it, move on in both  # @viz same
                return 1 + lcs(i + 1, j + 1)  # @viz same
            return max(lcs(i + 1, j), lcs(i, j + 1))  # different: drop one letter from either side  # @viz diff
        return lcs(0, 0)  # @viz return
