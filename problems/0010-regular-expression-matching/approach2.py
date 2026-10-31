class Solution(object):
    def isMatch(self, s, p):
        memo = {}  # (i, j) -> does s[i:] match p[j:]?  # @viz init

        def match(i, j):  # @viz call
            if (i, j) in memo:  # @viz hit
                return memo[(i, j)]  # @viz hit
            if j == len(p):  # @viz end
                ans = i == len(s)  # @viz end
            else:
                first = i < len(s) and p[j] in (s[i], '.')  # @viz first
                if j + 1 < len(p) and p[j + 1] == '*':  # @viz star
                    ans = match(i, j + 2) or (first and match(i + 1, j))  # @viz star
                else:
                    ans = first and match(i + 1, j + 1)  # @viz single
            memo[(i, j)] = ans  # @viz store
            return ans  # @viz store

        return match(0, 0)  # @viz return
