from collections import deque


class Solution(object):
    def orangesRotting(self, grid):
        rows, cols = len(grid), len(grid[0])  # @viz init
        queue = deque()  # @viz init
        fresh = 0  # @viz init
        for r in range(rows):  # @viz init
            for c in range(cols):  # @viz init
                if grid[r][c] == 2:  # @viz init
                    queue.append((r, c))  # every rotten orange starts at minute 0  # @viz init
                elif grid[r][c] == 1:  # @viz init
                    fresh += 1  # @viz init
        minutes = 0  # @viz init
        while queue and fresh:  # stop as soon as nothing is fresh  # @viz minute
            minutes += 1  # @viz minute
            for _ in range(len(queue)):  # one BFS level = one minute  # @viz minute
                r, c = queue.popleft()  # @viz pop
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):  # @viz look
                    nr, nc = r + dr, c + dc  # @viz look
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:  # @viz look
                        grid[nr][nc] = 2  # rot it now so it's never queued twice  # @viz rot
                        fresh -= 1  # @viz rot
                        queue.append((nr, nc))  # @viz rot
        return minutes if fresh == 0 else -1  # @viz return
