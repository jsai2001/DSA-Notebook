class Solution(object):
    def plusOne(self, digits):
        number = int("".join(map(str, digits)))  # Python ints have no size limit
        return [int(c) for c in str(number + 1)]
