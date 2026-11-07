class Solution(object):
    def minEatingSpeed(self, piles, h):
        k = (sum(piles) + h - 1) // h  # slower than this can't finish: h hours eat at most h * k bananas  # @viz init
        while True:  # try every speed from there up  # @viz try
            hours = sum((p + k - 1) // k for p in piles)  # @viz try
            if hours <= h:  # @viz return
                return k  # @viz return
            k += 1  # @viz next
