class Solution(object):
    def rotate(self, matrix):
        n = len(matrix)
        for layer in range(n // 2):  # rings from the outside in; an odd n's centre stays put  # @viz layer
            first, last = layer, n - 1 - layer  # @viz layer
            for k in range(last - first):  # each cell on the ring's top side starts a cycle of 4  # @viz cycle
                top = matrix[first][first + k]  # save top  # @viz cycle
                matrix[first][first + k] = matrix[last - k][first]  # left -> top  # @viz move
                matrix[last - k][first] = matrix[last][last - k]  # bottom -> left  # @viz move
                matrix[last][last - k] = matrix[first + k][last]  # right -> bottom  # @viz move
                matrix[first + k][last] = top  # saved top -> right  # @viz move
