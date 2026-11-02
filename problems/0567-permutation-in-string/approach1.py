class Solution(object):
    def checkInclusion(self, s1, s2):
        m = len(s1)  # @viz init
        target = sorted(s1)  # every permutation of s1 sorts to the same letters  # @viz init
        for i in range(len(s2) - m + 1):  # every window of length m  # @viz window
            if sorted(s2[i:i + m]) == target:  # @viz window
                return True  # @viz found
        return False  # @viz return
