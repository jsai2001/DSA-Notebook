from collections import deque
class Solution(object):
    def solve(self, board):
        m, n = len(board), len(board[0])  # @viz init
        queue = deque()  # @viz init
        for r in range(m):  # @viz seed
            for c in range(n):  # @viz seed
                if (r in (0, m - 1) or c in (0, n - 1)) and board[r][c] == "O":  # @viz seed
                    board[r][c] = "S"  # safe: it touches the border  # @viz seed
                    queue.append((r, c))  # @viz seed
        while queue:  # spread "safe" to every O connected to the border  # @viz pop
            r, c = queue.popleft()  # @viz pop
            for a, b in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):  # @viz spread
                if 0 <= a < m and 0 <= b < n and board[a][b] == "O":  # @viz spread
                    board[a][b] = "S"  # mark when queued, so it's queued once  # @viz spread
                    queue.append((a, b))  # @viz spread
        for r in range(m):  # @viz flip
            for c in range(n):  # @viz flip
                board[r][c] = "O" if board[r][c] == "S" else "X"  # O left over = trapped  # @viz flip
