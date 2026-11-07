class Solution(object):
    def isAnagram(self, s, t):
        if len(s) != len(t):  # @viz len
            return False  # @viz len
        count = [0] * 26  # one slot per letter a..z  # @viz count
        for ch in s:  # @viz count
            count[ord(ch) - 97] += 1  # @viz count
        for ch in t:  # @viz use
            k = ord(ch) - 97  # @viz use
            count[k] -= 1  # @viz use
            if count[k] < 0:  # t has more of this letter than s  # @viz short
                return False  # @viz short
        return True  # same length and no letter went negative: every count is 0  # @viz return
