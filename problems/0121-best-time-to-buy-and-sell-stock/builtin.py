from itertools import accumulate
class Solution(object):
    def maxProfit(self, prices):
        lows = accumulate(prices, min)  # lows[i] = the cheapest price on days 0..i
        return max(p - low for p, low in zip(prices, lows))  # 0 when selling on the buy day is the best
