class Solution(object):
    def uniquePaths(self, m, n):
        # A path is m - 1 moves down and n - 1 moves right, in some order:
        # the answer is how many ways to choose which of the m + n - 2 moves go down.
        total, k = m + n - 2, min(m, n) - 1  # C(total, k); the smaller k means fewer steps  # @viz init
        result = 1  # @viz init
        for i in range(1, k + 1):  # @viz step
            result = result * (total - k + i) // i  # now C(total - k + i, i): always a whole number  # @viz step
        return result  # @viz answer
