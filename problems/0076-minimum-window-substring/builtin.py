from collections import Counter
class Solution(object):
    def minWindow(self, s, t):
        need, have = Counter(t), Counter()
        best_start, best_len = 0, len(s) + 1
        left = 0
        for right, c in enumerate(s):
            have[c] += 1
            while need <= have:  # every count in t is covered (Python 3.10+)
                if right - left + 1 < best_len:
                    best_start, best_len = left, right - left + 1
                have[s[left]] -= 1
                left += 1
        return s[best_start:best_start + best_len] if best_len <= len(s) else ""
