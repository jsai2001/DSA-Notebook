class Solution(object):
    def wordBreak(self, s, wordDict):
        def can(start):  # can s[start:] be split into words?
            if start == len(s):  # nothing left: the split worked  # @viz done
                return True  # @viz done
            for w in wordDict:  # @viz try
                if s.startswith(w, start) and can(start + len(w)):  # w fits here, and the rest splits  # @viz try
                    return True  # @viz found
            return False  # no word works from here  # @viz fail

        return can(0)  # @viz init
