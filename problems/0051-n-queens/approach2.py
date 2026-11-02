class Solution(object):
    def solveNQueens(self, n):
        result, cols = [], []  # cols[r]: column of the queen in row r  # @viz init
        used_col, used_diag, used_anti = set(), set(), set()  # taken columns, r - c values, r + c values  # @viz init
        def place(r):  # @viz call
            if r == n:  # a queen in every row, none attacking another  # @viz done
                result.append(["." * c + "Q" + "." * (n - c - 1) for c in cols])  # @viz done
                return  # @viz done
            for c in range(n):  # @viz try
                if c in used_col or r - c in used_diag or r + c in used_anti:  # attacked: skip  # @viz attacked
                    continue  # @viz attacked
                used_col.add(c)  # @viz place
                used_diag.add(r - c)  # same r - c: same down-right diagonal  # @viz place
                used_anti.add(r + c)  # same r + c: same down-left diagonal  # @viz place
                cols.append(c)  # @viz place
                place(r + 1)  # @viz place
                cols.pop()  # undo, so the next column can be tried  # @viz undo
                used_col.remove(c)  # @viz undo
                used_diag.remove(r - c)  # @viz undo
                used_anti.remove(r + c)  # @viz undo
        place(0)  # @viz init
        return result  # @viz return
