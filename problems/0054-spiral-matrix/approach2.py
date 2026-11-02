class Solution(object):
    def spiralOrder(self, matrix):
        top, bottom = 0, len(matrix) - 1  # the rows and columns not taken yet  # @viz init
        left, right = 0, len(matrix[0]) - 1  # @viz init
        result = []  # @viz init
        while top <= bottom and left <= right:  # one ring per round  # @viz ring
            for c in range(left, right + 1):  # top row, left to right  # @viz top
                result.append(matrix[top][c])  # @viz top
            top += 1  # @viz top
            for r in range(top, bottom + 1):  # right column, top to bottom  # @viz right
                result.append(matrix[r][right])  # @viz right
            right -= 1  # @viz right
            if top <= bottom:  # a row is still left (not the one just taken)  # @viz bottom
                for c in range(right, left - 1, -1):  # bottom row, right to left  # @viz bottom
                    result.append(matrix[bottom][c])  # @viz bottom
                bottom -= 1  # @viz bottom
            if left <= right:  # a column is still left  # @viz left
                for r in range(bottom, top - 1, -1):  # left column, bottom to top  # @viz left
                    result.append(matrix[r][left])  # @viz left
                left += 1  # @viz left
        return result  # @viz return
