class Solution(object):
    def reverseBits(self, n):
        res = 0  # @viz init
        for _ in range(32):  # all 32 bits, even after n becomes 0  # @viz loop
            res = (res << 1) | (n & 1)  # n's lowest bit goes onto res's right end  # @viz move
            n >>= 1  # @viz move
        return res  # @viz return
