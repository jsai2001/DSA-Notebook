class Solution(object):
    def lengthOfLongestSubstring(self, s):
        len_str = len(s)
        if len_str == 0:
            return 0
        tracker = [[0] * len_str for _ in range(len_str)]
        max_sub_len = 1
        for j in range(len_str):
            hash = dict()
            for i in range(j, len_str):
                if s[i] not in hash:
                    tracker[i][j] = (tracker[i - 1][j] + 1 if i > 0 else 1)
                    max_sub_len = tracker[i][j] if max_sub_len < tracker[i][j] else max_sub_len
                    hash[s[i]] = 1
                else:
                    break
        return max_sub_len
