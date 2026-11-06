class Solution(object):
    def isPalindrome(self, s):
        cleaned = []  # @viz init
        for c in s:  # @viz loop
            if c.isalnum():  # letters and digits only  # @viz check
                cleaned.append(c.lower())  # @viz keep
        cleaned = "".join(cleaned)  # @viz join
        return cleaned == cleaned[::-1]  # reads the same backwards?  # @viz compare
