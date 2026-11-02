from itertools import accumulate
class Solution(object):
    def maxSubArray(self, nums):
        # accumulate carries Kadane's "best sum ending here" along the list; take the largest
        return max(accumulate(nums, lambda run, x: max(x, run + x)))
