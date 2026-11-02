class Solution(object):
    def spiralOrder(self, matrix):
        matrix = [row[:] for row in matrix]  # work on a copy  # @viz init
        result = []  # @viz init
        while matrix:  # @viz peel
            result += matrix.pop(0)  # take the whole first row  # @viz peel
            # turn what's left a quarter counter-clockwise: its right column becomes the first row
            matrix = [list(row) for row in zip(*matrix)][::-1]  # @viz rotate
        return result  # @viz return
