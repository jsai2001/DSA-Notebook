from collections import deque
class Solution(object):
    def pacificAtlantic(self, heights):
        m, n = len(heights), len(heights[0])  # @viz init
        def reach(starts):  # every cell that can drain into the cells in starts  # @viz init
            seen = [[False] * n for _ in range(m)]  # @viz seed
            q = deque(starts)  # @viz seed
            for i, j in starts:  # @viz seed
                seen[i][j] = True  # @viz seed
            while q:  # BFS uphill: water flows back down the same way  # @viz bfs
                i, j = q.popleft()  # @viz bfs
                for x, y in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):  # @viz bfs
                    if 0 <= x < m and 0 <= y < n and not seen[x][y] and heights[x][y] >= heights[i][j]:  # @viz bfs
                        seen[x][y] = True  # @viz bfs
                        q.append((x, y))  # @viz bfs
            return seen  # @viz bfs
        pac = reach([(0, c) for c in range(n)] + [(r, 0) for r in range(1, m)])  # top and left edges  # @viz seed
        atl = reach([(m - 1, c) for c in range(n)] + [(r, n - 1) for r in range(m - 1)])  # bottom and right edges  # @viz seed
        return [[r, c] for r in range(m) for c in range(n) if pac[r][c] and atl[r][c]]  # @viz return
