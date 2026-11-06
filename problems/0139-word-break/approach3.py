class Solution(object):
    def wordBreak(self, s, wordDict):
        n = len(s)  # @viz init
        words = set(wordDict)  # @viz init
        lengths = sorted({len(w) for w in wordDict})  # at most 20 different lengths  # @viz init
        dp = [False] * (n + 1)  # dp[i]: can the first i letters be split?  # @viz init
        dp[0] = True  # the empty prefix: zero words  # @viz init
        for i in range(1, n + 1):  # @viz end
            for L in lengths:  # the last word is s[i-L:i]  # @viz try
                if L > i:  # @viz try
                    break  # @viz try
                if dp[i - L] and s[i - L:i] in words:  # @viz hit
                    dp[i] = True  # @viz hit
                    break  # @viz hit
        return dp[n]  # @viz return
