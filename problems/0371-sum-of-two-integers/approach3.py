class Solution(object):
    def getSum(self, a, b):
        MASK = 0xFFFFFFFF  # Python ints never overflow, so keep 32 bits by hand  # @viz init
        a, b = a & MASK, b & MASK  # @viz init
        while b:  # until no carry is left  # @viz loop
            a, b = (a ^ b) & MASK, ((a & b) << 1) & MASK  # sum without carries, and the carries one place up  # @viz step
        return a if a <= 0x7FFFFFFF else ~(a ^ MASK)  # bit 31 set: turn it back into a negative Python int  # @viz return
