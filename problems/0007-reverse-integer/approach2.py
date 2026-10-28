class Solution(object):
    def reverse(self, x):
        sign = -1 if x < 0 else 1  # @viz init
        x = abs(x)  # @viz init
        # The biggest allowed magnitude: 2^31 - 1 for positive, 2^31 for negative.
        limit = 2**31 - 1 if sign > 0 else 2**31  # @viz init
        rev = 0  # @viz init
        while x:  # @viz loop
            digit = x % 10  # pop the last digit  # @viz pop
            x //= 10  # @viz pop
            # Would rev * 10 + digit go past the limit? Check before building it.
            if rev > limit // 10 or (rev == limit // 10 and digit > limit % 10):  # @viz check
                return 0  # @viz overflow
            rev = rev * 10 + digit  # push it onto rev  # @viz push
        return sign * rev  # @viz return
