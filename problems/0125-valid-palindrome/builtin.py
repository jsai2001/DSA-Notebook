class Solution(object):
    def isPalindrome(self, s):
        cleaned = "".join(filter(str.isalnum, s)).lower()
        return cleaned == cleaned[::-1]
