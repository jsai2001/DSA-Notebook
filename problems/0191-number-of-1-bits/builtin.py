class Solution(object):
    def hammingWeight(self, n):
        return bin(n).count("1")  # n.bit_count() on Python 3.10+
