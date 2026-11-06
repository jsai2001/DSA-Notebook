class Solution(object):
    def numDistinct(self, s, t):
        def count(i, j):  # ways to spell t[j:] using letters of s[i:], in order  # @viz call
            if j == len(t):  # all of t is spelled: one way  # @viz done
                return 1  # @viz done
            if len(s) - i < len(t) - j:  # not enough of s left  # @viz short
                return 0  # @viz short
            ways = count(i + 1, j)  # skip s[i]  # @viz skip
            if s[i] == t[j]:  # or use s[i] for t[j]  # @viz use
                ways += count(i + 1, j + 1)  # @viz use
            return ways  # @viz sum
        return count(0, 0)  # @viz answer
