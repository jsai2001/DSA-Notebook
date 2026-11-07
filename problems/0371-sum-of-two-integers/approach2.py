class Solution(object):
    def getSum(self, a, b):
        MASK = 0xFFFFFFFF  # @viz init
        def add(x, y):  # x, y are 32-bit patterns  # @viz init
            if y == 0:  # no carry left  # @viz return
                return x  # @viz return
            return add((x ^ y) & MASK, ((x & y) << 1) & MASK)  # sum without carries, and the carries one place up  # @viz step
        r = add(a & MASK, b & MASK)  # @viz init
        return r if r <= 0x7FFFFFFF else ~(r ^ MASK)  # bit 31 set: turn it back into a negative Python int  # @viz return
