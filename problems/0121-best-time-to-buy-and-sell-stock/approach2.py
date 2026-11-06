class Solution(object):
    def maxProfit(self, prices):
        best = 0  # @viz init
        buy = 0  # the buy day: the cheapest day seen so far  # @viz init
        for sell in range(1, len(prices)):  # the sell day moves right one day at a time  # @viz sell
            if prices[sell] < prices[buy]:  # a cheaper day: buying here beats any earlier buy  # @viz move
                buy = sell  # @viz move
            else:  # @viz profit
                best = max(best, prices[sell] - prices[buy])  # @viz profit
        return best  # @viz return
