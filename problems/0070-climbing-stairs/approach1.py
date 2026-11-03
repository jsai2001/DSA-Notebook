class Solution(object):
    def climbStairs(self, n):
        memo = {}  # k -> ways to climb k steps  # @viz init
        def ways(k):  # @viz call
            if k <= 2:  # 1 step: 1 way; 2 steps: 2 ways (1+1 or 2)  # @viz base
                return k  # @viz base
            if k not in memo:  # @viz memo
                memo[k] = ways(k - 1) + ways(k - 2)  # the last move was 1 step or 2 steps  # @viz add
            return memo[k]  # @viz memo
        return ways(n)  # @viz answer
