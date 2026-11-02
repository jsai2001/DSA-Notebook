class Solution(object):
    def uniquePaths(self, m, n):
        row = [1] * n  # the top row: one way to reach each of its cells  # @viz init
        for r in range(1, m):  # every row below it  # @viz row
            for c in range(1, n):  # column 0 stays 1  # @viz cell
                row[c] += row[c - 1]  # row[c] still holds the cell above; row[c - 1] is the cell to the left  # @viz cell
        return row[n - 1]  # @viz answer
