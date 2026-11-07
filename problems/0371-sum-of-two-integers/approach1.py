class Solution(object):
    def getSum(self, a, b):
        MASK = 0xFFFFFFFF  # work on 32-bit two's complement, like C++ and Java  # @viz init
        a, b = a & MASK, b & MASK  # @viz init
        res, carry = 0, 0  # @viz init
        for i in range(32):  # one full adder per bit, lowest first  # @viz bit
            x, y = a >> i & 1, b >> i & 1  # @viz bit
            res |= (x ^ y ^ carry) << i  # the sum bit: odd number of 1s  # @viz bit
            carry = (x & y) | (carry & (x ^ y))  # the carry: at least two 1s  # @viz bit
        return res if res <= 0x7FFFFFFF else ~(res ^ MASK)  # bit 31 set: turn it back into a negative Python int  # @viz return
