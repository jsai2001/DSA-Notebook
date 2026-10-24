class Solution(object):
    def lengthOfLongestSubstring(self, s):
        window = set()
        left = 0
        best = 0
        for right, ch in enumerate(s):
            while ch in window:
                window.remove(s[left])
                left += 1
            window.add(ch)
            best = max(best, right - left + 1)
        return best
