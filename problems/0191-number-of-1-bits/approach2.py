class Solution(object):
    def hammingWeight(self, n):
        count = 0  # @viz init
        while n:  # stop once no 1 bits are left  # @viz loop
            count += n & 1  # the lowest bit  # @viz test
            n >>= 1  # @viz shift
        return count  # @viz return
