class Solution(object):
    def lengthOfLongestSubstring(self, s):
        len_str = len(s)
        if len_str == 0:  # @viz empty
            return 0  # @viz empty
        tracker = [[0] * len_str for _ in range(len_str)]  # @viz init
        max_sub_len = 1  # @viz init
        for j in range(len_str):  # @viz outer
            hash = dict()  # @viz outer
            for i in range(j, len_str):
                if s[i] not in hash:  # @viz extend, repeat
                    tracker[i][j] = (tracker[i - 1][j] + 1 if i > 0 else 1)  # @viz extend
                    max_sub_len = tracker[i][j] if max_sub_len < tracker[i][j] else max_sub_len  # @viz extend
                    hash[s[i]] = 1  # @viz extend
                else:  # @viz repeat
                    break  # @viz repeat
        return max_sub_len  # @viz return
