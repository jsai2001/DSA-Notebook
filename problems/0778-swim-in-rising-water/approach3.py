class Solution(object):
    def swimInWater(self, grid):
        n = len(grid)  # @viz init
        where = [0] * (n * n)  # where[h] = the cell with height h (the heights are 0..n*n-1, each once)  # @viz init
        for r in range(n):  # @viz init
            for c in range(n):  # @viz init
                where[grid[r][c]] = r * n + c  # @viz init
        parent = list(range(n * n))  # union-find over the cells  # @viz init
        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]  # path halving
                x = parent[x]
            return x
        for t in range(n * n):  # the water rises; at time t the cell of height t opens  # @viz open
            cell = where[t]  # @viz open
            r, c = divmod(cell, n)  # @viz open
            for x, y in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):  # join it with open neighbours  # @viz join
                if 0 <= x < n and 0 <= y < n and grid[x][y] <= t:  # @viz join
                    parent[find(x * n + y)] = find(cell)  # @viz join
            if find(0) == find(n * n - 1):  # the corners are connected now  # @viz done
                return t  # @viz done
