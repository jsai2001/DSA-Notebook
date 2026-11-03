class Solution(object):
    def plusOne(self, digits):
        for i in range(len(digits) - 1, -1, -1):  # right to left  # @viz loop
            if digits[i] < 9:  # this digit can take the 1 without carrying  # @viz stop
                digits[i] += 1  # @viz stop
                return digits  # nothing to the left changes  # @viz stop
            digits[i] = 0  # 9 + 1 = 10: write 0 and carry 1 to the left  # @viz nine
        return [1] + digits  # every digit was 9: 99...9 + 1 = 100...0  # @viz grow
