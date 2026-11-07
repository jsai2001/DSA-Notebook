class Solution(object):
    def hammingWeight(self, n):
        count = 0  # @viz init
        for i in range(32):  # look at every bit position  # @viz loop
            count += (n >> i) & 1  # bit i, moved down to position 0  # @viz test
        return count  # @viz return
