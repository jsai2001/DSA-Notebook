from itertools import accumulate
class Solution(object):
    def trap(self, height):
        left_max = list(accumulate(height, max))  # running maximum from the left
        right_max = list(accumulate(reversed(height), max))[::-1]  # running maximum from the right
        return sum(min(l, r) - h for l, r, h in zip(left_max, right_max, height))
