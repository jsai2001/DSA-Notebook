import sys
sys.setrecursionlimit(50000)  # one path can go through all 200 * 200 cells
class Solution(object):
    def pacificAtlantic(self, heights):
        m, n = len(heights), len(heights[0])  # @viz init
        pac, atl = set(), set()  # cells whose water reaches each ocean  # @viz init
        def climb(i, j, seen):  # walk uphill from the ocean: water flows back down this way  # @viz climb
            seen.add((i, j))  # @viz climb
            for x, y in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):  # @viz climb
                if 0 <= x < m and 0 <= y < n and (x, y) not in seen and heights[x][y] >= heights[i][j]:  # @viz climb
                    climb(x, y, seen)  # @viz climb
        for c in range(n):  # @viz edges
            climb(0, c, pac)  # top edge: Pacific  # @viz edges
            climb(m - 1, c, atl)  # bottom edge: Atlantic  # @viz edges
        for r in range(m):  # @viz edges
            climb(r, 0, pac)  # left edge: Pacific  # @viz edges
            climb(r, n - 1, atl)  # right edge: Atlantic  # @viz edges
        return [[r, c] for r in range(m) for c in range(n) if (r, c) in pac and (r, c) in atl]  # @viz return
