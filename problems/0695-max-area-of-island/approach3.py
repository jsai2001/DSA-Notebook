class Solution(object):
    def maxAreaOfIsland(self, grid):
        R, C = len(grid), len(grid[0])  # @viz init
        best = 0  # @viz init
        for r in range(R):  # @viz cell
            for c in range(C):  # @viz cell
                if grid[r][c] == 0:  # @viz cell
                    continue  # @viz cell
                grid[r][c] = 0  # sink a cell when it's pushed, so it's never pushed twice  # @viz start
                stack = [(r, c)]  # @viz start
                size = 0  # @viz start
                while stack:  # @viz pop
                    i, j = stack.pop()  # @viz pop
                    size += 1  # @viz pop
                    for x, y in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):  # @viz push
                        if 0 <= x < R and 0 <= y < C and grid[x][y] == 1:  # @viz push
                            grid[x][y] = 0  # @viz push
                            stack.append((x, y))  # @viz push
                best = max(best, size)  # @viz best
        return best  # @viz return
