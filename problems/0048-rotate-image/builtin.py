class Solution(object):
    def rotate(self, matrix):
        # rows bottom to top, then zip reads them column by column; [:] writes into the same list
        matrix[:] = [list(row) for row in zip(*matrix[::-1])]
