class Solution(object):
    def checkInclusion(self, s1, s2):
        m, n = len(s1), len(s2)  # @viz init
        if m > n:  # @viz init
            return False  # @viz init
        diff = [0] * 26  # diff[c] = count of c in the window − count of c in s1  # @viz init
        for i in range(m):  # @viz init
            diff[ord(s1[i]) - 97] -= 1  # @viz init
            diff[ord(s2[i]) - 97] += 1  # @viz init
        zeros = diff.count(0)  # how many letters already agree  # @viz init
        for i in range(m, n):  # @viz slide
            if zeros == 26:  # every letter agrees: a permutation of s1  # @viz check
                return True  # @viz found
            c = ord(s2[i]) - 97  # s2[i] comes in  # @viz add
            if diff[c] == 0:  # it agreed before; it won't after  # @viz add
                zeros -= 1  # @viz add
            diff[c] += 1  # @viz add
            if diff[c] == 0:  # now it agrees  # @viz add
                zeros += 1  # @viz add
            c = ord(s2[i - m]) - 97  # s2[i - m] goes out  # @viz drop
            if diff[c] == 0:  # @viz drop
                zeros -= 1  # @viz drop
            diff[c] -= 1  # @viz drop
            if diff[c] == 0:  # @viz drop
                zeros += 1  # @viz drop
        return zeros == 26  # the last window hasn't been checked yet  # @viz return
