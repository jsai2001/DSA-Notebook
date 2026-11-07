class Solution(object):
    def longestIncreasingPath(self, matrix):
        R, C = len(matrix), len(matrix[0])  # @viz init
        def nbrs(r, c):
            for x, y in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= x < R and 0 <= y < C:
                    yield x, y
        bigger = [[sum(matrix[x][y] > matrix[r][c] for x, y in nbrs(r, c)) for c in range(C)] for r in range(R)]  # how many neighbours are bigger  # @viz count
        layer = [(r, c) for r in range(R) for c in range(C) if bigger[r][c] == 0]  # local peaks: every path ends at one  # @viz count
        length = 0  # @viz init
        while layer:  # peel the matrix from the peaks down, one layer per step of the path  # @viz peel
            length += 1  # @viz peel
            nxt = []  # @viz peel
            for r, c in layer:  # @viz peel
                for x, y in nbrs(r, c):  # @viz drop
                    if matrix[x][y] < matrix[r][c]:  # a smaller neighbour loses one bigger neighbour  # @viz drop
                        bigger[x][y] -= 1  # @viz drop
                        if bigger[x][y] == 0:  # all its bigger neighbours are peeled: it's in the next layer  # @viz drop
                            nxt.append((x, y))  # @viz drop
            layer = nxt  # @viz peel
        return length  # the number of layers = the longest path  # @viz return
