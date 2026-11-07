class Solution(object):
    def minEatingSpeed(self, piles, h):
        k = 1  # @viz init
        while True:  # try every speed, slowest first  # @viz try
            hours = sum((p + k - 1) // k for p in piles)  # ceil(p / k) hours per pile  # @viz try
            if hours <= h:  # the first speed that's fast enough  # @viz return
                return k  # @viz return
            k += 1  # @viz next
