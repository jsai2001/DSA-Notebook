import sys
sys.setrecursionlimit(100000)  # a path can visit every cell: up to 4 * 10^4 deep
class Solution(object):
    def longestIncreasingPath(self, matrix):
        R, C = len(matrix), len(matrix[0])  # @viz init
        def longest(r, c):  # the longest increasing path starting here, worked out from scratch each time  # @viz call
            best = 1  # @viz call
            for x, y in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):  # @viz step
                if 0 <= x < R and 0 <= y < C and matrix[x][y] > matrix[r][c]:  # @viz step
                    best = max(best, 1 + longest(x, y))  # @viz step
            return best  # @viz call
        return max(longest(r, c) for r in range(R) for c in range(C))  # @viz return
