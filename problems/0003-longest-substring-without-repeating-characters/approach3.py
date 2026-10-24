class Solution(object):
    def lengthOfLongestSubstring(self, s):
        last = {}  # {char: last index seen}  # @viz init
        left = 0  # @viz init
        best = 0  # @viz init
        for right, ch in enumerate(s):  # @viz loop
            if ch in last and last[ch] >= left:  # @viz check
                left = last[ch] + 1  # @viz jump
            last[ch] = right  # @viz record
            best = max(best, right - left + 1)  # @viz record
        return best  # @viz return
