class Solution(object):
    def countBits(self, n):
        return [i.bit_count() for i in range(n + 1)]  # Python 3.10+; older: bin(i).count("1")
