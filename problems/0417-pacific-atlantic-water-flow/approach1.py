class Solution(object):
    def pacificAtlantic(self, heights):
        m, n = len(heights), len(heights[0])  # @viz init
        ans = []  # @viz init
        for r in range(m):  # from every cell, follow the water downhill  # @viz cell
            for c in range(n):  # @viz cell
                pac = atl = False  # @viz cell
                seen, stack = {(r, c)}, [(r, c)]  # @viz cell
                while stack and not (pac and atl):  # @viz flow
                    i, j = stack.pop()  # @viz flow
                    pac |= i == 0 or j == 0  # touches the top or left edge  # @viz flow
                    atl |= i == m - 1 or j == n - 1  # touches the bottom or right edge  # @viz flow
                    for x, y in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):  # @viz flow
                        if 0 <= x < m and 0 <= y < n and (x, y) not in seen and heights[x][y] <= heights[i][j]:  # water flows to equal or lower  # @viz flow
                            seen.add((x, y))  # @viz flow
                            stack.append((x, y))  # @viz flow
                if pac and atl:  # @viz both
                    ans.append([r, c])  # @viz both
        return ans  # @viz return
