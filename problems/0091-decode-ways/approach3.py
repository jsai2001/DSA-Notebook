class Solution(object):
    def numDecodings(self, s):
        prev2, prev1 = 0, 1  # dp[i - 2] and dp[i - 1]; start: dp[-1] (unused) = 0, dp[0] = 1  # @viz init
        for i in range(1, len(s) + 1):  # @viz loop
            cur = 0  # @viz loop
            if s[i - 1] != "0":  # the last digit alone is a letter (1-9)  # @viz one
                cur += prev1  # @viz one
            if i >= 2 and 10 <= int(s[i - 2:i]) <= 26:  # the last two digits are a letter (10-26)  # @viz two
                cur += prev2  # @viz two
            prev2, prev1 = prev1, cur  # slide: only the last two values are ever needed  # @viz shift
        return prev1  # @viz answer
