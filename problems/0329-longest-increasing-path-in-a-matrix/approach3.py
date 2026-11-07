import sys
sys.setrecursionlimit(100000)  # a path can visit every cell: up to 4 * 10^4 deep
class Solution(object):
    def longestIncreasingPath(self, matrix):
        R, C = len(matrix), len(matrix[0])  # @viz init
        memo = [[0] * C for _ in range(R)]  # 0 = not worked out yet  # @viz init
        def longest(r, c):  # the longest increasing path starting here  # @viz call
            if memo[r][c]:  # @viz memo
                return memo[r][c]  # @viz memo
            best = 1  # @viz call
            for x, y in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):  # @viz step
                if 0 <= x < R and 0 <= y < C and matrix[x][y] > matrix[r][c]:  # strictly bigger, so no cycles: the memo is safe  # @viz step
                    best = max(best, 1 + longest(x, y))  # @viz step
            memo[r][c] = best  # @viz store
            return best  # @viz store
        return max(longest(r, c) for r in range(R) for c in range(C))  # @viz return
