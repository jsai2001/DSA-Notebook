class Solution(object):
    def myPow(self, x, n):
        return x ** n  # the same as pow(x, n); negative n gives 1 / x^|n|
