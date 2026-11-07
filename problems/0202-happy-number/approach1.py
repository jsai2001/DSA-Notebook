class Solution(object):
    def isHappy(self, n):
        seen = set()  # every number met so far  # @viz init
        while n != 1:  # @viz loop
            if n in seen:  # met before: the numbers go round in a loop without 1  # @viz repeat
                return False  # @viz repeat
            seen.add(n)  # @viz step
            n = sum(int(d) ** 2 for d in str(n))  # the sum of the squares of the digits  # @viz step
        return True  # @viz happy
