class Solution(object):
    def isHappy(self, n):
        while n != 1 and n != 4:  # every unhappy number falls into the loop 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4  # @viz loop
            n = sum(int(d) ** 2 for d in str(n))  # @viz step
        return n == 1  # @viz return
