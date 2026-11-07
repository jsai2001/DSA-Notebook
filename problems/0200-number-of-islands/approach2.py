class Solution(object):
    def numIslands(self, grid):
        R, C = len(grid), len(grid[0])  # @viz init
        parent = list(range(R * C))  # cell r * C + c starts as its own group  # @viz init
        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]  # path halving
                x = parent[x]
            return x
        count = sum(row.count("1") for row in grid)  # every land cell starts as its own island  # @viz init
        for r in range(R):  # @viz cell
            for c in range(C):  # @viz cell
                if grid[r][c] != "1":  # @viz cell
                    continue  # @viz cell
                for x, y in ((r + 1, c), (r, c + 1)):  # down and right are enough: each pair is met once  # @viz pair
                    if x < R and y < C and grid[x][y] == "1":  # @viz pair
                        a, b = find(r * C + c), find(x * C + y)  # @viz pair
                        if a != b:  # two separate islands touch: they are one  # @viz join
                            parent[a] = b  # @viz join
                            count -= 1  # @viz join
        return count  # @viz return
