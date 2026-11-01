class Solution(object):
    def rotate(self, matrix):
        n = len(matrix)
        rotated = [[0] * n for _ in range(n)]  # a second n × n grid  # @viz init
        for i in range(n):  # @viz copy
            for j in range(n):  # @viz copy
                rotated[j][n - 1 - i] = matrix[i][j]  # row i becomes column n - 1 - i  # @viz copy
        for i in range(n):  # copy back: the answer has to end up in matrix itself  # @viz back
            matrix[i][:] = rotated[i]  # @viz back
