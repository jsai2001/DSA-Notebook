class Solution(object):
    def minEatingSpeed(self, piles, h):
        lo, hi = 1, max(piles)  # at max(piles), every pile takes one hour, and h >= len(piles)  # @viz init
        while lo < hi:  # the answer is in [lo, hi]  # @viz loop
            k = (lo + hi) // 2  # @viz mid
            hours = sum((p + k - 1) // k for p in piles)  # @viz mid
            if hours <= h:  # k is fast enough: the answer is k or slower  # @viz fast
                hi = k  # @viz fast
            else:  # too slow: the answer is faster than k  # @viz slow
                lo = k + 1  # @viz slow
        return lo  # @viz return
