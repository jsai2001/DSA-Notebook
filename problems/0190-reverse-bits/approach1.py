class Solution(object):
    def reverseBits(self, n):
        bits = format(n, "032b")  # exactly 32 digits, leading zeros kept  # @viz text
        return int(bits[::-1], 2)  # read the digits backwards  # @viz back
