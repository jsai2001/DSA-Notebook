class Solution(object):
    def solve(self, board):
        m, n = len(board), len(board[0])  # @viz init
        parent = list(range(m * n + 1))  # cell r * n + c, plus one extra node: "the border"  # @viz init
        BORDER = m * n  # @viz init

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]  # path halving keeps the trees flat
                x = parent[x]
            return x

        def union(a, b):
            parent[find(a)] = find(b)

        for r in range(m):  # @viz loop
            for c in range(n):  # @viz loop
                if board[r][c] != "O":  # @viz loop
                    continue  # @viz loop
                if r in (0, m - 1) or c in (0, n - 1):  # @viz border
                    union(r * n + c, BORDER)  # @viz border
                if r + 1 < m and board[r + 1][c] == "O":  # join with the O below  # @viz join
                    union(r * n + c, (r + 1) * n + c)  # @viz join
                if c + 1 < n and board[r][c + 1] == "O":  # and the O to the right  # @viz join
                    union(r * n + c, r * n + c + 1)  # @viz join
        border = find(BORDER)  # @viz flip
        for r in range(m):  # @viz flip
            for c in range(n):  # @viz flip
                if board[r][c] == "O" and find(r * n + c) != border:  # @viz flip
                    board[r][c] = "X"  # not in the border's group: trapped  # @viz flip
