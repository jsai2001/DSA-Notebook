class Solution(object):
    def isPalindrome(self, s):
        cleaned = [c.lower() for c in s if c.isalnum()]  # @viz clean
        i, j = 0, len(cleaned) - 1  # @viz init
        while i < j:  # @viz loop
            if cleaned[i] != cleaned[j]:  # @viz compare
                return False  # @viz false
            i += 1  # @viz move
            j -= 1  # @viz move
        return True  # @viz true
