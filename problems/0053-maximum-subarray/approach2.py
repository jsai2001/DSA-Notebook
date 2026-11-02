class Solution(object):
    def maxSubArray(self, nums):
        return self.best(nums, 0, len(nums) - 1)  # @viz start

    def best(self, nums, lo, hi):  # largest sum of a subarray inside nums[lo..hi]  # @viz call
        if lo == hi:  # one number  # @viz base
            return nums[lo]  # @viz base
        mid = (lo + hi) // 2  # @viz split
        left = self.best(nums, lo, mid)  # the best subarray lies entirely in the left half  # @viz split
        right = self.best(nums, mid + 1, hi)  # ... or entirely in the right half  # @viz split
        # ... or it crosses the middle: the best run ending at mid, plus the best run starting at mid + 1
        total, left_run = 0, float("-inf")  # @viz cross
        for i in range(mid, lo - 1, -1):  # @viz cross
            total += nums[i]  # @viz cross
            left_run = max(left_run, total)  # @viz cross
        total, right_run = 0, float("-inf")  # @viz cross
        for j in range(mid + 1, hi + 1):  # @viz cross
            total += nums[j]  # @viz cross
            right_run = max(right_run, total)  # @viz cross
        return max(left, right, left_run + right_run)  # @viz combine
