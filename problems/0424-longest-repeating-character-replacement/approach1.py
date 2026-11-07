class Solution(object):
    def characterReplacement(self, s, k):
        best = 0  # @viz init
        for i in range(len(s)):  # every start  # @viz start
            count = [0] * 26  # @viz start
            top = 0  # count of the most common letter in s[i:j + 1]  # @viz start
            for j in range(i, len(s)):  # every end  # @viz grow
                count[ord(s[j]) - 65] += 1  # @viz grow
                top = max(top, count[ord(s[j]) - 65])  # @viz grow
                if j - i + 1 - top > k:  # more than k letters to change: longer ends won't work either  # @viz stop
                    break  # @viz stop
                best = max(best, j - i + 1)  # @viz best
        return best  # @viz return
