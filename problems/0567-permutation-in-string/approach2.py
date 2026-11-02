class Solution(object):
    def checkInclusion(self, s1, s2):
        m, n = len(s1), len(s2)  # @viz init
        if m > n:  # no window is long enough  # @viz init
            return False  # @viz init
        need = [0] * 26  # letter counts of s1  # @viz init
        have = [0] * 26  # letter counts of the current window  # @viz init
        for i in range(m):  # the first window is s2[0:m]  # @viz init
            need[ord(s1[i]) - 97] += 1  # @viz init
            have[ord(s2[i]) - 97] += 1  # @viz init
        for i in range(m, n):  # @viz slide
            if have == need:  # same counts: this window is a permutation of s1  # @viz check
                return True  # @viz found
            have[ord(s2[i]) - 97] += 1  # slide right: s2[i] comes in  # @viz slide
            have[ord(s2[i - m]) - 97] -= 1  # and s2[i - m] goes out  # @viz slide
        return have == need  # the last window hasn't been checked yet  # @viz return
