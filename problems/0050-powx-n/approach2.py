class Solution(object):
    def myPow(self, x, n):
        if n < 0:  # x^-n = (1/x)^n  # @viz flip
            x, n = 1 / x, -n  # @viz flip
        return self.power(x, n)  # @viz start

    def power(self, x, n):  # x^n for n >= 0  # @viz call
        if n == 0:  # @viz base
            return 1.0  # @viz base
        half = self.power(x, n // 2)  # x^(n // 2), computed once and reused  # @viz half
        if n % 2 == 0:  # @viz even, odd
            return half * half  # @viz even
        return half * half * x  # odd n: one extra x  # @viz odd
