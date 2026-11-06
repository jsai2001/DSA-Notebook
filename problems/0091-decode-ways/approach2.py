class Solution(object):
    def numDecodings(self, s):
        n = len(s)  # @viz init
        dp = [0] * (n + 1)  # dp[i] = ways to decode the first i digits  # @viz init
        dp[0] = 1  # no digits: one way (decode nothing)  # @viz init
        for i in range(1, n + 1):  # @viz loop
            if s[i - 1] != "0":  # the last digit alone is a letter (1-9)  # @viz one
                dp[i] += dp[i - 1]  # @viz one
            if i >= 2 and 10 <= int(s[i - 2:i]) <= 26:  # the last two digits are a letter (10-26)  # @viz two
                dp[i] += dp[i - 2]  # @viz two
        return dp[n]  # @viz answer
