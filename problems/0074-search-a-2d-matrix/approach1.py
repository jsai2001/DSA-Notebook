class Solution(object):
    def searchMatrix(self, matrix, target):
        for row in matrix:  # @viz row
            for value in row:  # look at every cell  # @viz cell
                if value == target:  # @viz cell
                    return True  # @viz found
        return False  # @viz return
