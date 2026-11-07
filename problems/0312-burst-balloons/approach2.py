import sys
sys.setrecursionlimit(5000)
class Solution(object):
    def maxCoins(self, nums):
        a = [1] + nums + [1]  # padding: the ends act like balloons worth 1 that never burst  # @viz init
        memo = {}  # @viz init
        def best(lo, hi):  # the most coins from bursting every balloon strictly between lo and hi  # @viz call
            if lo + 1 == hi:  # nothing in between  # @viz base
                return 0  # @viz base
            if (lo, hi) not in memo:  # @viz memo
                memo[(lo, hi)] = max(  # pick k, the LAST balloon burst in here: when it goes, lo and hi are its neighbours  # @viz last
                    best(lo, k) + a[lo] * a[k] * a[hi] + best(k, hi) for k in range(lo + 1, hi))  # @viz last
            return memo[(lo, hi)]  # @viz memo
        return best(0, len(a) - 1)  # @viz return
