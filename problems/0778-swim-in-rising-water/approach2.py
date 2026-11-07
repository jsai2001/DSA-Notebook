import heapq
class Solution(object):
    def swimInWater(self, grid):
        n = len(grid)  # @viz init
        heap = [(grid[0][0], 0, 0)]  # (the highest cell on the way here, r, c), lowest first  # @viz init
        seen = {(0, 0)}  # @viz init
        while True:  # @viz pop
            t, r, c = heapq.heappop(heap)  # the cell reachable soonest  # @viz pop
            if (r, c) == (n - 1, n - 1):  # @viz done
                return t  # @viz done
            for x, y in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):  # @viz push
                if 0 <= x < n and 0 <= y < n and (x, y) not in seen:  # @viz push
                    seen.add((x, y))  # @viz push
                    heapq.heappush(heap, (max(t, grid[x][y]), x, y))  # you wait for the higher of the path and the cell  # @viz push
