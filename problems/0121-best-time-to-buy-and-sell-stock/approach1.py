class Solution(object):
    def maxProfit(self, prices):
        best = 0  # not trading at all makes 0  # @viz init
        for i in range(len(prices)):  # buy on day i  # @viz buy
            for j in range(i + 1, len(prices)):  # sell on a later day j  # @viz sell
                best = max(best, prices[j] - prices[i])  # @viz profit
        return best  # @viz return
