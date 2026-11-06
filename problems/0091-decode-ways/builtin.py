from functools import cache
class Solution(object):
    def numDecodings(self, s):
        @cache  # remembers ways(i) the first time, so each i is worked out once
        def ways(i):
            if i == len(s):
                return 1
            if s[i] == "0":
                return 0
            total = ways(i + 1)
            if i + 1 < len(s) and 10 <= int(s[i:i + 2]) <= 26:
                total += ways(i + 2)
            return total
        return ways(0)
