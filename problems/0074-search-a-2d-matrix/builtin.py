from bisect import bisect_right
class Solution(object):
    def searchMatrix(self, matrix, target):
        # The last row whose first value is <= target is the only row that can hold it.
        r = bisect_right(matrix, target, key=lambda row: row[0]) - 1  # key= needs Python 3.10+
        if r < 0:
            return False  # smaller than everything
        row = matrix[r]
        c = bisect_right(row, target) - 1
        return c >= 0 and row[c] == target
