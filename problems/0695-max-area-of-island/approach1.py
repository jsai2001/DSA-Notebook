class Solution(object):
    def maxAreaOfIsland(self, grid):
        R, C = len(grid), len(grid[0])  # @viz init
        best = 0  # @viz init
        for r in range(R):  # @viz cell
            for c in range(C):  # @viz cell
                if grid[r][c] == 0:  # @viz cell
                    continue  # @viz cell
                seen = {(r, c)}  # count this cell's island from scratch  # @viz fill
                stack = [(r, c)]  # @viz fill
                while stack:  # @viz fill
                    i, j = stack.pop()  # @viz fill
                    for x, y in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):  # @viz fill
                        if 0 <= x < R and 0 <= y < C and grid[x][y] == 1 and (x, y) not in seen:  # @viz fill
                            seen.add((x, y))  # @viz fill
                            stack.append((x, y))  # @viz fill
                best = max(best, len(seen))  # @viz best
        return best  # @viz return
