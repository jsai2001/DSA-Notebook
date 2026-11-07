class Solution(object):
    def characterReplacement(self, s, k):
        best = 0  # @viz init
        for c in set(s):  # guess which letter the run is made of  # @viz letter
            lo = other = 0  # other: letters in the window that aren't c  # @viz letter
            for hi in range(len(s)):  # @viz grow
                other += s[hi] != c  # @viz grow
                while other > k:  # too many to change: shrink from the left  # @viz shrink
                    other -= s[lo] != c  # @viz shrink
                    lo += 1  # @viz shrink
                best = max(best, hi - lo + 1)  # @viz best
        return best  # @viz return
