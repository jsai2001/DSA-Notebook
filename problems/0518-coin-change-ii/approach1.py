import sys


class Solution(object):
    def change(self, amount, coins):
        sys.setrecursionlimit(20000)  # depth can reach amount + len(coins)
        memo = {}  # (i, rem) -> ways  # @viz init

        def ways(i, rem):  # ways to make rem using coins[i:]  # @viz call
            if rem == 0:  # @viz done
                return 1  # @viz done
            if rem < 0 or i == len(coins):  # @viz dead
                return 0  # @viz dead
            if (i, rem) in memo:  # @viz hit
                return memo[(i, rem)]  # @viz hit
            # take coins[i] (and stay on it), or skip to the next coin
            memo[(i, rem)] = ways(i, rem - coins[i]) + ways(i + 1, rem)  # @viz split
            return memo[(i, rem)]  # @viz store

        return ways(0, amount)  # @viz return
