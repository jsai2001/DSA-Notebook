class Solution(object):
    def minWindow(self, s, t):
        need = {}  # how many more of each letter the window needs; below 0 = extra  # @viz init
        for c in t:  # @viz init
            need[c] = need.get(c, 0) + 1  # @viz init
        missing = len(t)  # letters of t not yet in the window  # @viz init
        best_start, best_len = 0, len(s) + 1  # no window yet  # @viz init
        left = 0  # @viz init
        for right in range(len(s)):  # @viz grow
            c = s[right]  # @viz grow
            if need.get(c, 0) > 0:  # t still needed this letter  # @viz grow
                missing -= 1  # @viz grow
            need[c] = need.get(c, 0) - 1  # @viz grow
            if missing == 0:  # the window covers t  # @viz check
                while need[s[left]] < 0:  # s[left] is extra: drop it  # @viz shrink
                    need[s[left]] += 1  # @viz shrink
                    left += 1  # @viz shrink
                if right - left + 1 < best_len:  # the shortest window ending at right  # @viz record
                    best_start, best_len = left, right - left + 1  # @viz record
                need[s[left]] += 1  # give up s[left]: now one letter of t is missing  # @viz release
                missing += 1  # @viz release
                left += 1  # @viz release
        return s[best_start:best_start + best_len] if best_len <= len(s) else ""  # @viz return
