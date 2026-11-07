class Solution(object):
    def coinChange(self, coins, amount):
        INF = amount + 1  # more coins than could ever be needed: stands for "impossible"  # @viz init
        dp = [0] + [INF] * amount  # dp[a] = the fewest coins that make a  # @viz init
        for a in range(1, amount + 1):  # smallest amounts first  # @viz amount
            for c in coins:  # @viz try
                if c <= a and dp[a - c] + 1 < dp[a]:  # use c as the last coin  # @viz try
                    dp[a] = dp[a - c] + 1  # @viz try
        return dp[amount] if dp[amount] <= amount else -1  # @viz return
