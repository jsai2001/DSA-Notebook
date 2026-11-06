class Solution(object):
    def solve(self, board):
        m, n = len(board), len(board[0])  # @viz init

        def escapes(r, c):  # can this O reach the border through other O's?
            seen = {(r, c)}  # a fresh search for every cell  # @viz search
            stack = [(r, c)]  # @viz search
            while stack:  # @viz search
                i, j = stack.pop()  # @viz search
                if i in (0, m - 1) or j in (0, n - 1):  # @viz border
                    return True  # @viz border
                for a, b in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):  # @viz search
                    if board[a][b] == "O" and (a, b) not in seen:  # @viz search
                        seen.add((a, b))  # @viz search
                        stack.append((a, b))  # @viz search
            return False  # @viz trapped

        trapped = []  # @viz init
        for r in range(m):  # @viz loop
            for c in range(n):  # @viz loop
                if board[r][c] == "O" and not escapes(r, c):  # @viz loop
                    trapped.append((r, c))  # @viz trapped
        for r, c in trapped:  # flip after all the checks  # @viz flip
            board[r][c] = "X"  # @viz flip
