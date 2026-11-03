class Solution(object):
    def plusOne(self, digits):
        n = len(digits)  # @viz find
        k = n - 1  # @viz find
        while k >= 0 and digits[k] == 9:  # skip the run of 9s at the end  # @viz find
            k -= 1  # @viz find
        if k < 0:  # all 9s  # @viz grow
            return [1] + [0] * n  # @viz grow
        # digits[k] is the last digit that isn't 9: it goes up by one, and the 9s after it become 0
        return digits[:k] + [digits[k] + 1] + [0] * (n - 1 - k)  # @viz build
