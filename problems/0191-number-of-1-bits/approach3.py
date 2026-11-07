class Solution(object):
    def hammingWeight(self, n):
        count = 0  # @viz init
        while n:  # one round per 1 bit  # @viz loop
            n &= n - 1  # n - 1 flips the lowest 1 and the zeros below it; & clears that 1  # @viz clear
            count += 1  # @viz clear
        return count  # @viz return
