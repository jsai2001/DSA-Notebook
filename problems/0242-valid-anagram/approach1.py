class Solution(object):
    def isAnagram(self, s, t):
        return sorted(s) == sorted(t)  # anagrams have the same letters, so the same sorted order  # @viz sort
