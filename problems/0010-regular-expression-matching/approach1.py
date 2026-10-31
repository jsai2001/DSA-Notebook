class Solution(object):
    def isMatch(self, s, p):
        def match(i, j):  # does s[i:] match p[j:]?  # @viz call
            if j == len(p):  # @viz end
                return i == len(s)  # @viz end
            first = i < len(s) and p[j] in (s[i], '.')  # @viz first
            if j + 1 < len(p) and p[j + 1] == '*':  # @viz star
                # skip "x*" (zero copies), or use one copy and stay on "x*"
                return match(i, j + 2) or (first and match(i + 1, j))  # @viz star
            return first and match(i + 1, j + 1)  # @viz single

        return match(0, 0)  # @viz start
