import sys
class Solution(object):
    def uniquePaths(self, m, n):
        sys.setrecursionlimit(10000)  # the calls go up to m + n levels deep
        memo = {}  # (r, c) -> number of paths from the top-left corner to (r, c)  # @viz init
        def paths(r, c):  # @viz call
            if r == 0 or c == 0:  # top row or left column: one way, a straight line  # @viz edge
                return 1  # @viz edge
            if (r, c) not in memo:  # @viz memo
                memo[(r, c)] = paths(r - 1, c) + paths(r, c - 1)  # arrive from above, or from the left  # @viz add
            return memo[(r, c)]  # @viz memo
        return paths(m - 1, n - 1)  # @viz answer
