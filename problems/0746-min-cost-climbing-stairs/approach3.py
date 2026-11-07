class Solution(object):
    def minCostClimbingStairs(self, cost):
        two, one = 0, 0  # the cheapest way to stand two steps below, and one step below  # @viz init
        for i in range(2, len(cost) + 1):  # @viz loop
            two, one = one, min(one + cost[i - 1], two + cost[i - 2])  # @viz choose
        return one  # @viz return
