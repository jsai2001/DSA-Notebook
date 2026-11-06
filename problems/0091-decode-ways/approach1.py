class Solution(object):
    def numDecodings(self, s):
        def ways(i):  # how many ways to decode s[i:]  # @viz call
            if i == len(s):  # nothing left: one way (decode nothing)  # @viz base
                return 1  # @viz base
            if s[i] == "0":  # no letter's code starts with 0  # @viz zero
                return 0  # @viz zero
            total = ways(i + 1)  # s[i] alone is a letter (1-9)  # @viz one
            if i + 1 < len(s) and 10 <= int(s[i:i + 2]) <= 26:  # s[i..i+1] is a letter too (10-26)  # @viz two
                total += ways(i + 2)  # @viz two
            return total  # @viz sum
        return ways(0)  # @viz answer
