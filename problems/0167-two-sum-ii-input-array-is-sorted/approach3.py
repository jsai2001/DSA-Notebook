class Solution(object):
    def twoSum(self, numbers, target):
        lo, hi = 0, len(numbers) - 1  # the smallest and the largest  # @viz init
        while lo < hi:  # @viz loop
            s = numbers[lo] + numbers[hi]  # @viz loop
            if s == target:  # @viz found
                return [lo + 1, hi + 1]  # 1-indexed  # @viz found
            if s < target:  # too small: only a bigger left number can help  # @viz up
                lo += 1  # @viz up
            else:  # too big: only a smaller right number can help  # @viz down
                hi -= 1  # @viz down
