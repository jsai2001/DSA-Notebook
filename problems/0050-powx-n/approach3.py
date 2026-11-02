class Solution(object):
    def myPow(self, x, n):
        if n < 0:  # x^-n = (1/x)^n  # @viz flip
            x, n = 1 / x, -n  # @viz flip
        result = 1.0  # @viz init
        while n:  # one round per bit of n, lowest bit first  # @viz loop
            if n & 1:  # this bit is set: x (now x^(2^k)) is part of the answer  # @viz bit
                result *= x  # @viz bit
            x *= x  # x^(2^k) -> x^(2^(k+1))  # @viz square
            n >>= 1  # @viz square
        return result  # @viz return
