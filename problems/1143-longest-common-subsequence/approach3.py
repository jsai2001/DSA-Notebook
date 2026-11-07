class Solution(object):
    def longestCommonSubsequence(self, text1, text2):
        if len(text2) > len(text1):  # keep the shorter text as the row  # @viz init
            text1, text2 = text2, text1  # @viz init
        prev = [0] * (len(text2) + 1)  # the previous row of the table  # @viz init
        for a in text1:  # @viz row
            cur = [0]  # @viz row
            for j, b in enumerate(text2):  # @viz cell
                cur.append(prev[j] + 1 if a == b else max(prev[j + 1], cur[j]))  # diagonal + 1, or the best of up and left  # @viz same, diff
            prev = cur  # only one row is ever needed  # @viz row
        return prev[-1]  # @viz return
