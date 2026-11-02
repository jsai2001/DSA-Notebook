from math import comb
class Solution(object):
    def uniquePaths(self, m, n):
        return comb(m + n - 2, m - 1)  # choose which of the m + n - 2 moves go down (Python 3.8+)
