from collections import deque
class Solution(object):
    def numIslands(self, grid):
        R, C = len(grid), len(grid[0])  # @viz init
        count = 0  # @viz init
        for r in range(R):  # @viz cell
            for c in range(C):  # @viz cell
                if grid[r][c] != "1":  # @viz cell
                    continue  # @viz cell
                count += 1  # land not sunk yet: a new island  # @viz start
                grid[r][c] = "0"  # sink a cell when it's queued, so it's never queued twice  # @viz start
                queue = deque([(r, c)])  # @viz start
                while queue:  # @viz pop
                    i, j = queue.popleft()  # @viz pop
                    for x, y in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):  # @viz push
                        if 0 <= x < R and 0 <= y < C and grid[x][y] == "1":  # @viz push
                            grid[x][y] = "0"  # @viz push
                            queue.append((x, y))  # @viz push
        return count  # @viz return
