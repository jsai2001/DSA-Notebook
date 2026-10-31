class Solution(object):
    def orangesRotting(self, grid):
        rows, cols = len(grid), len(grid[0])  # @viz init
        minutes = 0  # @viz init
        while True:  # @viz minute
            # Find every fresh orange next to a rotten one, using this minute's grid only.
            to_rot = []  # @viz scan
            for r in range(rows):  # @viz scan
                for c in range(cols):  # @viz scan
                    if grid[r][c] == 1 and any(  # @viz scan
                        0 <= r + dr < rows and 0 <= c + dc < cols and grid[r + dr][c + dc] == 2
                        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1))
                    ):
                        to_rot.append((r, c))  # @viz found
            if not to_rot:  # @viz stop
                break  # @viz stop
            for r, c in to_rot:  # rot them all at once, after the scan  # @viz rot
                grid[r][c] = 2  # @viz rot
            minutes += 1  # @viz rot
        # Anything still fresh can never be reached.
        if any(1 in row for row in grid):  # @viz check
            return -1  # @viz check
        return minutes  # @viz return
