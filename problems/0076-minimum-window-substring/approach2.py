class Solution(object):
    def minWindow(self, s, t):
        need = {}  # @viz init
        for c in t:  # @viz init
            need[c] = need.get(c, 0) + 1  # @viz init
        have = {}  # @viz init
        best_start, best_len = 0, len(s) + 1  # no window yet  # @viz init
        left = 0  # @viz init
        for right in range(len(s)):  # @viz grow
            have[s[right]] = have.get(s[right], 0) + 1  # @viz grow
            # Does s[left..right] cover t? Look at every distinct letter of t.
            while all(have.get(c, 0) >= k for c, k in need.items()):  # @viz check
                if right - left + 1 < best_len:  # @viz record
                    best_start, best_len = left, right - left + 1  # @viz record
                have[s[left]] -= 1  # drop the leftmost letter and try again  # @viz shrink
                left += 1  # @viz shrink
        return s[best_start:best_start + best_len] if best_len <= len(s) else ""  # @viz return
