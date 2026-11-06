class Solution(object):
    def wordBreak(self, s, wordDict):
        memo = {}  # start -> can s[start:] be split?  # @viz init

        def can(start):
            if start == len(s):  # @viz done
                return True  # @viz done
            if start in memo:  # already worked out: don't redo it  # @viz memo
                return memo[start]  # @viz memo
            ok = False  # @viz try
            for w in wordDict:  # @viz try
                if s.startswith(w, start) and can(start + len(w)):  # @viz try
                    ok = True  # @viz found
                    break  # @viz found
            memo[start] = ok  # @viz save
            return ok  # @viz save

        return can(0)  # @viz init
