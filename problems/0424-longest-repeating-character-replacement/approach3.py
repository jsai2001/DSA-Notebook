class Solution(object):
    def characterReplacement(self, s, k):
        count = [0] * 26  # letters in the window  # @viz init
        lo = top = 0  # top: the biggest count any letter has reached in a window  # @viz init
        for hi in range(len(s)):  # @viz grow
            count[ord(s[hi]) - 65] += 1  # @viz grow
            top = max(top, count[ord(s[hi]) - 65])  # @viz grow
            if hi - lo + 1 - top > k:  # too many to change: slide the window instead of growing it  # @viz slide
                count[ord(s[lo]) - 65] -= 1  # @viz slide
                lo += 1  # @viz slide
        return len(s) - lo  # the window never shrinks, so its final size is the best size  # @viz return
