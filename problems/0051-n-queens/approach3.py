class Solution(object):
    def solveNQueens(self, n):
        result, cols = [], []  # cols[r]: column of the queen in row r  # @viz init
        full = (1 << n) - 1  # n one-bits: bit c stands for column c  # @viz init
        def place(col_mask, diag_mask, anti_mask):  # bits set = columns attacked in this row  # @viz call
            if col_mask == full:  # every column has a queen: every row does too  # @viz done
                result.append(["." * c + "Q" + "." * (n - c - 1) for c in cols])  # @viz done
                return  # @viz done
            free = full & ~(col_mask | diag_mask | anti_mask)  # columns that are safe in this row  # @viz free
            while free:  # @viz pick
                bit = free & -free  # the lowest safe column  # @viz pick
                free -= bit  # @viz pick
                cols.append(bit.bit_length() - 1)  # @viz pick
                # one row down, a down-right attack moves one column right (<< 1), a down-left one left (>> 1)
                place(col_mask | bit, ((diag_mask | bit) << 1) & full, (anti_mask | bit) >> 1)  # @viz pick
                cols.pop()  # undo  # @viz undo
        place(0, 0, 0)  # @viz init
        return result  # @viz return
