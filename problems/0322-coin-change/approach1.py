import sys
sys.setrecursionlimit(30000)  # with a 1-coin, the calls go `amount` deep: up to 10^4
class Solution(object):
    def coinChange(self, coins, amount):
        memo = {}  # @viz init
        def fewest(a):  # the fewest coins that add up to a, or inf  # @viz call
            if a == 0:  # @viz base
                return 0  # @viz base
            if a not in memo:  # @viz memo
                best = float("inf")  # @viz try
                for c in coins:  # the last coin is one of coins  # @viz try
                    if c <= a:  # @viz try
                        best = min(best, 1 + fewest(a - c))  # @viz try
                memo[a] = best  # @viz memo
            return memo[a]  # @viz memo
        ans = fewest(amount)  # @viz return
        return -1 if ans == float("inf") else ans  # @viz return
