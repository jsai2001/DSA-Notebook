import sys
sys.setrecursionlimit(20000)  # one call per day: up to 5000 deep
class Solution(object):
    def maxProfit(self, prices):
        n = len(prices)  # @viz init
        memo = {}  # @viz init
        def best(i, holding):  # the most profit from day i on, holding a share or not  # @viz call
            if i >= n:  # no days left  # @viz base
                return 0  # @viz base
            if (i, holding) not in memo:  # @viz memo
                if holding:  # sell today (then cool down: skip to i + 2), or keep holding  # @viz sell
                    memo[(i, holding)] = max(prices[i] + best(i + 2, False), best(i + 1, True))  # @viz sell
                else:  # buy today, or wait  # @viz buy
                    memo[(i, holding)] = max(-prices[i] + best(i + 1, True), best(i + 1, False))  # @viz buy
            return memo[(i, holding)]  # @viz memo
        return best(0, False)  # @viz return
