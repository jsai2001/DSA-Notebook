class Solution(object):
    def change(self, amount, coins):
        n = len(coins)  # @viz init
        # dp[i][a] = ways to make a using only the first i coins
        dp = [[0] * (amount + 1) for _ in range(n + 1)]  # @viz init
        dp[0][0] = 1  # one way to make 0: use nothing  # @viz init
        for i in range(1, n + 1):  # @viz row
            coin = coins[i - 1]  # @viz row
            for a in range(amount + 1):  # @viz cell
                dp[i][a] = dp[i - 1][a]  # skip this coin  # @viz skip
                if a >= coin:  # @viz take
                    dp[i][a] += dp[i][a - coin]  # use it at least once  # @viz take
        return dp[n][amount]  # @viz return
