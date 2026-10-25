class Solution(object):
    def is_Palin(self, s):
        return s == s[::-1]

    def longestPalindrome(self, s):
        min_len = 1  # Length of the longest palindromic substring that we observed till now.  # @viz init
        check_len = 1  # This must be the minimum length that we need to look for next palindromic substring in the string, going forward.  # @viz init
        str_len = len(s)  # @viz init
        long_str = s[0]  # @viz init
        while check_len <= str_len and min_len <= str_len:  # @viz length
            for char_idx in range(str_len - check_len + 1):  # @viz check
                if self.is_Palin(s[char_idx:char_idx + check_len]):  # @viz check
                    min_len = check_len  # @viz found
                    long_str = s[char_idx:char_idx + check_len]  # @viz found
                    break  # @viz found
            check_len += 1  # @viz next
        return long_str  # @viz return
