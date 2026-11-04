class Solution(object):
    def searchMatrix(self, matrix, target):
        # Start at the top-right corner: everything to its left is smaller, everything below is bigger.
        r, c = 0, len(matrix[0]) - 1  # @viz init
        while r < len(matrix) and c >= 0:  # @viz loop
            value = matrix[r][c]  # @viz loop
            if value == target:  # @viz found
                return True  # @viz found
            if value > target:  # too big: the whole column below is bigger still  # @viz left
                c -= 1  # @viz left
            else:  # too small: the rest of this row is to the left, smaller still  # @viz down
                r += 1  # @viz down
        return False  # walked off the matrix  # @viz return
