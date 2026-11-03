class Solution(object):
    def climbStairs(self, n):
        prev, cur = 1, 1  # ways(0) and ways(1): standing still counts as one way  # @viz init
        for _ in range(n - 1):  # step up from 1 to n  # @viz loop
            prev, cur = cur, prev + cur  # ways(k) = ways(k - 1) + ways(k - 2)  # @viz loop
        return cur  # @viz answer
