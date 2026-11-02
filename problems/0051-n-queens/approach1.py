class Solution(object):
    def solveNQueens(self, n):
        result, cols = [], []  # cols[r]: column of the queen in row r  # @viz init
        used = [False] * n  # one queen per column  # @viz init
        def place(r):  # @viz call
            if r == n:  # a queen in every row and column: only now look at diagonals  # @viz full
                if self.no_diagonal_attacks(cols):  # @viz check
                    result.append(["." * c + "Q" + "." * (n - c - 1) for c in cols])  # @viz keep
                return  # @viz full
            for c in range(n):  # @viz try
                if not used[c]:  # @viz try
                    used[c] = True  # @viz try
                    cols.append(c)  # @viz try
                    place(r + 1)  # @viz try
                    cols.pop()  # @viz undo
                    used[c] = False  # @viz undo
        place(0)  # @viz init
        return result  # @viz return

    def no_diagonal_attacks(self, cols):
        for i in range(len(cols)):
            for j in range(i + 1, len(cols)):
                if abs(cols[i] - cols[j]) == j - i:  # rows apart == columns apart: same diagonal
                    return False
        return True
