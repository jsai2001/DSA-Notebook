class Solution(object):
    def searchMatrix(self, matrix, target):
        # Read row by row, the matrix is one sorted list of m * n numbers.
        m, n = len(matrix), len(matrix[0])  # @viz init
        lo, hi = 0, m * n - 1  # positions in that list  # @viz init
        while lo <= hi:  # @viz loop
            mid = (lo + hi) // 2  # @viz loop
            value = matrix[mid // n][mid % n]  # position -> (row, column): divide by the row length n  # @viz loop
            if value == target:  # @viz found
                return True  # @viz found
            if value < target:  # @viz right
                lo = mid + 1  # the target is after mid  # @viz right
            else:  # @viz left
                hi = mid - 1  # the target is before mid  # @viz left
        return False  # @viz return
