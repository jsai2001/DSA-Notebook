class Solution(object):
    def setZeroes(self, matrix):
        m, n = len(matrix), len(matrix[0])  # @viz init
        zero_rows, zero_cols = [False] * m, [False] * n  # @viz init
        for i in range(m):  # pass 1: only remember where the zeros are  # @viz mark
            for j in range(n):  # @viz mark
                if matrix[i][j] == 0:  # @viz mark
                    zero_rows[i] = zero_cols[j] = True  # @viz mark
        for i in range(m):  # pass 2: zero every cell in a marked row or column  # @viz fill
            for j in range(n):  # @viz fill
                if zero_rows[i] or zero_cols[j]:  # @viz fill
                    matrix[i][j] = 0  # @viz fill
