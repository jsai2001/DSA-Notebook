class Solution(object):
    def spiralOrder(self, matrix):
        m, n = len(matrix), len(matrix[0])
        seen = [[False] * n for _ in range(m)]  # @viz init
        dr, dc = [0, 1, 0, -1], [1, 0, -1, 0]  # right, down, left, up  # @viz init
        r = c = d = 0  # @viz init
        result = []  # @viz init
        for _ in range(m * n):  # every cell exactly once  # @viz take
            result.append(matrix[r][c])  # @viz take
            seen[r][c] = True  # @viz take
            nr, nc = r + dr[d], c + dc[d]  # the next cell in this direction  # @viz look
            if not (0 <= nr < m and 0 <= nc < n) or seen[nr][nc]:  # off the edge, or already taken: turn right  # @viz turn
                d = (d + 1) % 4  # @viz turn
                nr, nc = r + dr[d], c + dc[d]  # @viz turn
            r, c = nr, nc  # @viz look
        return result  # @viz return
