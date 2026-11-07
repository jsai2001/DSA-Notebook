class Solution(object):
    def maxProfit(self, prices):
        hold, sold, rest = -prices[0], 0, 0  # the three states after day 0  # @viz init
        for p in prices[1:]:  # @viz day
            hold, sold, rest = max(hold, rest - p), hold + p, max(rest, sold)  # all from yesterday's values  # @viz day
        return max(sold, rest)  # @viz return
