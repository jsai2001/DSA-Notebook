import sys
sys.setrecursionlimit(5000)  # up to 1000 steps: about 1000 calls deep
class Solution(object):
    def minCostClimbingStairs(self, cost):
        n = len(cost)  # @viz init
        memo = {}  # @viz init
        def reach(i):  # the cheapest way to stand on step i (step n is the top)  # @viz call
            if i <= 1:  # you may start on step 0 or step 1 for free  # @viz base
                return 0  # @viz base
            if i not in memo:  # @viz memo
                memo[i] = min(reach(i - 1) + cost[i - 1], reach(i - 2) + cost[i - 2])  # come from one step below, or two  # @viz choose
            return memo[i]  # @viz memo
        return reach(n)  # @viz return
