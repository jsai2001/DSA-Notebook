class Solution(object):
    def isAnagram(self, s, t):
        if len(s) != len(t):  # @viz len
            return False  # @viz len
        count = {}  # letter -> (times in s) - (times in t)  # @viz count
        for a, b in zip(s, t):  # @viz count
            count[a] = count.get(a, 0) + 1  # @viz count
            count[b] = count.get(b, 0) - 1  # @viz count
        return all(v == 0 for v in count.values())  # every letter evens out  # @viz check
