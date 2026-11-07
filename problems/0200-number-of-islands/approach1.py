import sys
sys.setrecursionlimit(200000)  # one call per cell: a 300 x 300 island is 90,000 calls deep
class Solution(object):
    def numIslands(self, grid):
        R, C = len(grid), len(grid[0])  # @viz init
        def sink(r, c):  # turn the whole island into water  # @viz visit
            if r < 0 or r >= R or c < 0 or c >= C or grid[r][c] != "1":  # off the grid, water, or already sunk  # @viz stop
                return  # @viz stop
            grid[r][c] = "0"  # @viz sink
            sink(r + 1, c)  # @viz sink
            sink(r - 1, c)  # @viz sink
            sink(r, c + 1)  # @viz sink
            sink(r, c - 1)  # @viz sink
        count = 0  # @viz init
        for r in range(R):  # @viz cell
            for c in range(C):  # @viz cell
                if grid[r][c] == "1":  # land not sunk yet: a new island  # @viz cell
                    count += 1  # @viz count
                    sink(r, c)  # @viz count
        return count  # @viz return
