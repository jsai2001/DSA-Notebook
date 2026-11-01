class Solution(object):
    def rotate(self, matrix):
        n = len(matrix)
        for i in range(n):  # 1. transpose: flip over the main diagonal  # @viz transpose
            for j in range(i + 1, n):  # only above the diagonal, or every pair swaps twice  # @viz transpose
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]  # @viz transpose
        for row in matrix:  # 2. reverse each row: flip left to right  # @viz reverse
            row.reverse()  # @viz reverse
