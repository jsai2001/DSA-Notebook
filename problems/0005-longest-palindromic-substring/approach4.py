class Solution(object):
    def longestPalindrome(self, s):
        t = "^#" + "#".join(s) + "#$"  # "#" between chars; ^ and $ stop expansion  # @viz build
        p = [0] * len(t)  # p[i]: radius of the palindrome centered at t[i]  # @viz build
        center = right = 0  # @viz build
        for i in range(1, len(t) - 1):  # @viz loop
            if i < right:  # @viz mirror
                p[i] = min(right - i, p[2 * center - i])  # reuse the mirror's radius  # @viz mirror
            while t[i + p[i] + 1] == t[i - p[i] - 1]:  # @viz expand
                p[i] += 1  # @viz expand
            if i + p[i] > right:  # @viz update
                center, right = i, i + p[i]  # @viz update
        length, mid = max((v, i) for i, v in enumerate(p))  # @viz answer
        start = (mid - length) // 2  # @viz answer
        return s[start:start + length]  # @viz answer
