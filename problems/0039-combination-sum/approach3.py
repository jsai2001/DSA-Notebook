class Solution(object):
    def combinationSum(self, candidates, target):
        dp = [[] for _ in range(target + 1)]  # dp[t]: every combination that adds up to t  # @viz init
        dp[0] = [[]]  # one way to make 0: take nothing  # @viz init
        for c in candidates:  # candidates in the outer loop, so each combination is built in one order  # @viz coin
            for t in range(c, target + 1):  # @viz amount
                for combo in dp[t - c]:  # every way to make t - c, plus one more c  # @viz extend
                    dp[t].append(combo + [c])  # @viz extend
        return dp[target]  # @viz return
