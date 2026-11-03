class Solution(object):
    def plusOne(self, digits):
        result = digits[:]  # a copy, so the caller's list isn't changed  # @viz init
        carry = 1  # adding one is a carry of 1 into the last digit  # @viz init
        for i in range(len(result) - 1, -1, -1):  # right to left, like adding on paper  # @viz loop
            total = result[i] + carry  # @viz loop
            result[i] = total % 10  # @viz loop
            carry = total // 10  # 1 only when total was 10  # @viz loop
        if carry:  # a carry out of the first digit: every digit was 9  # @viz grow
            result.insert(0, carry)  # @viz grow
        return result  # @viz return
