class Solution(object):
    def setZeroes(self, matrix):
        m, n = len(matrix), len(matrix[0])  # @viz init
        # Use row 0 and column 0 as the marks. matrix[0][0] marks row 0,
        # so column 0 needs a mark of its own: this flag.
        col0_zero = False  # @viz init
        for i in range(m):  # @viz mark
            if matrix[i][0] == 0:  # a zero in column 0: remember it in the flag  # @viz mark
                col0_zero = True  # @viz mark
            for j in range(1, n):  # @viz mark
                if matrix[i][j] == 0:  # @viz mark
                    matrix[i][0] = 0  # mark row i  # @viz mark
                    matrix[0][j] = 0  # mark column j  # @viz mark
        for i in range(1, m):  # the inside first, while the marks are still intact  # @viz fill
            for j in range(1, n):  # @viz fill
                if matrix[i][0] == 0 or matrix[0][j] == 0:  # @viz fill
                    matrix[i][j] = 0  # @viz fill
        if matrix[0][0] == 0:  # row 0 had a zero  # @viz row0
            for j in range(n):  # @viz row0
                matrix[0][j] = 0  # @viz row0
        if col0_zero:  # column 0 had a zero  # @viz col0
            for i in range(m):  # @viz col0
                matrix[i][0] = 0  # @viz col0
