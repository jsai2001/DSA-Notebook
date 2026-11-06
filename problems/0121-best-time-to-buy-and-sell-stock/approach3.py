class Solution(object):
    def maxProfit(self, prices):
        lowest = float("inf")  # the cheapest price before today  # @viz init
        best = 0  # @viz init
        for p in prices:  # @viz loop
            best = max(best, p - lowest)  # sell today, having bought at the cheapest day before  # @viz profit
            lowest = min(lowest, p)  # today may be the cheapest day for later sales  # @viz low
        return best  # @viz return
