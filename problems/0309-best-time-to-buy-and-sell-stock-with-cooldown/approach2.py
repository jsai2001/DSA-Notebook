class Solution(object):
    def maxProfit(self, prices):
        n = len(prices)  # @viz init
        hold = [0] * n  # the best money at the end of day i while holding a share  # @viz init
        sold = [0] * n  # ... having sold today (so tomorrow is a cooldown)  # @viz init
        rest = [0] * n  # ... holding nothing, free to buy tomorrow  # @viz init
        hold[0] = -prices[0]  # @viz init
        for i in range(1, n):  # @viz day
            hold[i] = max(hold[i - 1], rest[i - 1] - prices[i])  # keep holding, or buy today (only from rest)  # @viz day
            sold[i] = hold[i - 1] + prices[i]  # sell what you held  # @viz day
            rest[i] = max(rest[i - 1], sold[i - 1])  # stay out, or yesterday was the sale (cooldown ends)  # @viz day
        return max(sold[-1], rest[-1])  # end without a share  # @viz return
