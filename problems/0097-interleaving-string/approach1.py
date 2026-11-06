class Solution(object):
    def isInterleave(self, s1, s2, s3):
        if len(s1) + len(s2) != len(s3):  # the letters have to add up  # @viz len
            return False  # @viz len
        def can(i, j):  # can s3[i+j:] be made from s1[i:] and s2[j:]?  # @viz call
            if i == len(s1) and j == len(s2):  # everything used: done  # @viz base
                return True  # @viz base
            k = i + j  # the next letter of s3  # @viz call
            if i < len(s1) and s1[i] == s3[k] and can(i + 1, j):  # take it from s1  # @viz take1
                return True  # @viz take1
            if j < len(s2) and s2[j] == s3[k] and can(i, j + 1):  # or from s2  # @viz take2
                return True  # @viz take2
            return False  # @viz fail
        return can(0, 0)  # @viz answer
