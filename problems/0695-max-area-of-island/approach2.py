import sys
sys.setrecursionlimit(10000)  # one call per cell: a 50 x 50 island is 2500 calls deep
class Solution(object):
    def maxAreaOfIsland(self, grid):
        R, C = len(grid), len(grid[0])  # @viz init
        def area(r, c):  # land cells reached from (r, c)  # @viz visit
            if r < 0 or r >= R or c < 0 or c >= C or grid[r][c] == 0:  # off the grid, water, or already sunk  # @viz stop
                return 0  # @viz stop
            grid[r][c] = 0  # sink it, so it's never counted again  # @viz sink
            return 1 + area(r + 1, c) + area(r - 1, c) + area(r, c + 1) + area(r, c - 1)  # @viz sink
        best = 0  # @viz init
        for r in range(R):  # @viz cell
            for c in range(C):  # @viz cell
                if grid[r][c] == 1:  # land not sunk yet: a new island  # @viz cell
                    best = max(best, area(r, c))  # @viz best
        return best  # @viz return
