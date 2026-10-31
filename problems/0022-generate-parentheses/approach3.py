class Solution(object):
    def generateParenthesis(self, n):
        dp = [[""]]  # dp[k]: every valid string with k pairs; 0 pairs -> just ""  # @viz init
        for k in range(1, n + 1):  # @viz size
            dp.append([])  # @viz size
            for c in range(k):  # c pairs inside the first "( )", the other k - 1 - c after it  # @viz split
                for inside in dp[c]:  # @viz combine
                    for after in dp[k - 1 - c]:  # @viz combine
                        dp[k].append("(" + inside + ")" + after)  # @viz combine
        return dp[n]  # @viz return
