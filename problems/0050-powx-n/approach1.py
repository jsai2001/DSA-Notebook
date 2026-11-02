class Solution(object):
    def myPow(self, x, n):
        if n < 0:  # x^-n = (1/x)^n  # @viz flip
            x, n = 1 / x, -n  # @viz flip
        result = 1.0  # @viz init
        for _ in range(n):  # multiply by x, n times  # @viz loop
            result *= x  # @viz loop
        return result  # @viz return
