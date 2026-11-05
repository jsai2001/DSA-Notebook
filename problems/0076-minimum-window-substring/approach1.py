class Solution(object):
    def minWindow(self, s, t):
        need = {}  # @viz init
        for c in t:  # @viz init
            need[c] = need.get(c, 0) + 1  # @viz init
        best_start, best_len = 0, len(s) + 1  # no window yet  # @viz init
        for i in range(len(s)):  # @viz start
            have = {}  # @viz start
            missing = len(t)  # letters of t not yet in s[i..j]  # @viz start
            for j in range(i, len(s)):  # @viz grow
                c = s[j]  # @viz grow
                have[c] = have.get(c, 0) + 1  # @viz grow
                if have[c] <= need.get(c, 0):  # one more letter of t is covered  # @viz grow
                    missing -= 1  # @viz grow
                if missing == 0:  # s[i..j] covers t  # @viz found
                    if j - i + 1 < best_len:  # @viz record
                        best_start, best_len = i, j - i + 1  # @viz record
                    break  # a longer window from i can't be shorter  # @viz found
        return s[best_start:best_start + best_len] if best_len <= len(s) else ""  # @viz return
