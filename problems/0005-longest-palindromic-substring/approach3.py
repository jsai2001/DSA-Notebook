class Solution(object):
    def longestPalindrome(self, s):
        start, best = 0, 1  # @viz init
        for center in range(len(s)):  # @viz center
            for left, right in ((center, center), (center, center + 1)):  # odd, then even length  # @viz center
                while left >= 0 and right < len(s) and s[left] == s[right]:  # @viz step
                    left -= 1  # @viz step
                    right += 1  # @viz step
                if right - left - 1 > best:  # @viz record
                    start, best = left + 1, right - left - 1  # @viz record
        return s[start:start + best]  # @viz return
