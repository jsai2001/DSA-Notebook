class Solution(object):
    def reverse(self, x):
        rev = int(str(abs(x))[::-1])  # "120" -> "021" -> 21
        rev = -rev if x < 0 else rev
        return rev if -2**31 <= rev <= 2**31 - 1 else 0
