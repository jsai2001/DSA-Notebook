class Solution(object):
    def minDistance(self, word1, word2):
        if len(word1) < len(word2):  # the distance is the same both ways; keep the row short  # @viz init
            word1, word2 = word2, word1  # @viz init
        n = len(word2)  # @viz init
        row = list(range(n + 1))  # row[j] = dp[0][j] = j: build word2[:j] from ""  # @viz init
        for i in range(1, len(word1) + 1):  # turn row into dp[i][...]  # @viz row
            diag = row[0]  # dp[i - 1][j - 1], saved before it's overwritten  # @viz row
            row[0] = i  # dp[i][0] = i  # @viz row
            for j in range(1, n + 1):  # @viz cell
                above = row[j]  # still dp[i - 1][j]  # @viz cell
                if word1[i - 1] == word2[j - 1]:  # @viz cell
                    row[j] = diag  # @viz cell
                else:  # @viz cell
                    row[j] = 1 + min(diag, above, row[j - 1])  # row[j - 1] is already dp[i][j - 1]  # @viz cell
                diag = above  # the next cell's diagonal  # @viz cell
        return row[n]  # @viz answer
