class Solution(object):
    def lengthOfLongestSubstring(self, s):
        window = set()  # @viz init
        left = 0  # @viz init
        best = 0  # @viz init
        for right, ch in enumerate(s):  # @viz loop
            while ch in window:  # @viz dup
                window.remove(s[left])  # @viz shrink
                left += 1  # @viz shrink
            window.add(ch)  # @viz add
            best = max(best, right - left + 1)  # @viz add
        return best  # @viz return
