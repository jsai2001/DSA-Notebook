class Solution(object):
    def setZeroes(self, matrix):
        m, n = len(matrix), len(matrix[0])  # @viz copy
        original = [row[:] for row in matrix]  # find the zeros here, so new zeros don't spread  # @viz copy
        for i in range(m):  # @viz scan
            for j in range(n):  # @viz scan
                if original[i][j] == 0:  # @viz scan
                    for c in range(n):  # wipe its row  # @viz wipe
                        matrix[i][c] = 0  # @viz wipe
                    for r in range(m):  # and its column  # @viz wipe
                        matrix[r][j] = 0  # @viz wipe
