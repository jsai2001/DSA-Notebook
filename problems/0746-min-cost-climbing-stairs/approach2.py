class Solution(object):
    def minCostClimbingStairs(self, cost):
        n = len(cost)  # @viz init
        dp = [0] * (n + 1)  # dp[i] = the cheapest way to stand on step i; dp[0] = dp[1] = 0  # @viz init
        for i in range(2, n + 1):  # @viz loop
            dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])  # pay for the step you leave from  # @viz choose
        return dp[n]  # step n is the top, past the last stair  # @viz return
