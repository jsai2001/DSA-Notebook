class Solution(object):
    def countSubstrings(self, s):
        n = len(s)  # @viz init
        count = 0  # @viz init
        for i in range(n):  # @viz pick
            for j in range(i, n):  # every substring s[i..j]  # @viz pick
                lo, hi = i, j  # @viz check
                while lo < hi and s[lo] == s[hi]:  # two pointers moving inward  # @viz check
                    lo += 1  # @viz check
                    hi -= 1  # @viz check
                if lo >= hi:  # the pointers met: it's a palindrome  # @viz count
                    count += 1  # @viz count
        return count  # @viz return
