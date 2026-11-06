class Solution(object):
    def isPalindrome(self, s):
        i, j = 0, len(s) - 1  # @viz init
        while i < j:  # @viz loop
            while i < j and not s[i].isalnum():  # skip from the left  # @viz skipleft
                i += 1  # @viz skipleft
            while i < j and not s[j].isalnum():  # skip from the right  # @viz skipright
                j -= 1  # @viz skipright
            if s[i].lower() != s[j].lower():  # @viz compare
                return False  # @viz false
            i += 1  # @viz move
            j -= 1  # @viz move
        return True  # @viz true
