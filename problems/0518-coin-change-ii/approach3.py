class Solution(object):
    def change(self, amount, coins):
        dp = [0] * (amount + 1)  # dp[a] = ways to make a  # @viz init
        dp[0] = 1  # one way to make 0: use nothing  # @viz init
        for coin in coins:  # coins outside, so each combination is counted once  # @viz coin
            for a in range(coin, amount + 1):  # @viz cell
                dp[a] += dp[a - coin]  # add the ways that end with this coin  # @viz add
        return dp[amount]  # @viz return
