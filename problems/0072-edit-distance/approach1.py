import sys
class Solution(object):
    def minDistance(self, word1, word2):
        sys.setrecursionlimit(5000)  # the calls go up to len(word1) + len(word2) deep
        m, n = len(word1), len(word2)  # @viz init
        memo = {}  # (i, j) -> edits to turn word1[i:] into word2[j:]  # @viz init
        def dist(i, j):  # @viz call
            if i == m:  # word1 is used up: insert the rest of word2  # @viz edge
                return n - j  # @viz edge
            if j == n:  # word2 is used up: delete the rest of word1  # @viz edge
                return m - i  # @viz edge
            if (i, j) not in memo:  # @viz memo
                if word1[i] == word2[j]:  # same letter: keep it, no edit  # @viz same
                    memo[(i, j)] = dist(i + 1, j + 1)  # @viz same
                else:  # @viz edit
                    memo[(i, j)] = 1 + min(dist(i + 1, j + 1),  # replace word1[i] with word2[j]  # @viz edit
                                           dist(i + 1, j),  # delete word1[i]  # @viz edit
                                           dist(i, j + 1))  # insert word2[j]  # @viz edit
            return memo[(i, j)]  # @viz memo
        return dist(0, 0)  # @viz answer
