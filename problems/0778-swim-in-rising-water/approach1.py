class Solution(object):
    def swimInWater(self, grid):
        n = len(grid)  # @viz init
        def can(t):  # at time t, can you reach the far corner using only cells <= t?  # @viz test
            if grid[0][0] > t:  # @viz test
                return False  # @viz test
            seen = {(0, 0)}  # @viz test
            stack = [(0, 0)]  # @viz test
            while stack:  # @viz test
                r, c = stack.pop()  # @viz test
                if (r, c) == (n - 1, n - 1):  # @viz test
                    return True  # @viz test
                for x, y in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):  # @viz test
                    if 0 <= x < n and 0 <= y < n and (x, y) not in seen and grid[x][y] <= t:  # @viz test
                        seen.add((x, y))  # @viz test
                        stack.append((x, y))  # @viz test
            return False  # @viz test
        lo, hi = grid[0][0], n * n - 1  # the answer is somewhere in here  # @viz init
        while lo < hi:  # find the smallest t that works  # @viz search
            mid = (lo + hi) // 2  # @viz search
            if can(mid):  # works: maybe something smaller does too  # @viz yes
                hi = mid  # @viz yes
            else:  # too early  # @viz no
                lo = mid + 1  # @viz no
        return lo  # @viz return
