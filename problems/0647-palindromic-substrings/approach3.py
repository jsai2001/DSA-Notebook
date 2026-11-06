class Solution(object):
    def countSubstrings(self, s):
        n = len(s)  # @viz init
        count = 0  # @viz init
        for center in range(2 * n - 1):  # n letters + n - 1 gaps between them  # @viz center
            lo = center // 2  # @viz center
            hi = lo + center % 2  # odd center: lo == hi (one letter); even: hi = lo + 1  # @viz center
            while lo >= 0 and hi < n and s[lo] == s[hi]:  # grow while the ends match  # @viz grow
                count += 1  # each step outward is one more palindrome  # @viz grow
                lo -= 1  # @viz grow
                hi += 1  # @viz grow
        return count  # @viz return
