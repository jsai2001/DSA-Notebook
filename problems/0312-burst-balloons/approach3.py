class Solution(object):
    def maxCoins(self, nums):
        a = [1] + nums + [1]  # padding: the ends act like balloons worth 1 that never burst  # @viz init
        m = len(a)  # @viz init
        dp = [[0] * m for _ in range(m)]  # dp[lo][hi] = the most coins from the balloons strictly between lo and hi  # @viz init
        for gap in range(2, m):  # short intervals first, so the parts are ready  # @viz gap
            for lo in range(m - gap):  # @viz gap
                hi = lo + gap  # @viz gap
                dp[lo][hi] = max(dp[lo][k] + a[lo] * a[k] * a[hi] + dp[k][hi] for k in range(lo + 1, hi))  # k is burst last  # @viz last
        return dp[0][m - 1]  # @viz return
