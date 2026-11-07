class Solution(object):
    def productExceptSelf(self, nums):
        n = len(nums)  # @viz init
        left = [1] * n  # left[i] = the product of everything before i  # @viz left
        for i in range(1, n):  # @viz left
            left[i] = left[i - 1] * nums[i - 1]  # @viz left
        right = [1] * n  # right[i] = the product of everything after i  # @viz right
        for i in range(n - 2, -1, -1):  # @viz right
            right[i] = right[i + 1] * nums[i + 1]  # @viz right
        return [left[i] * right[i] for i in range(n)]  # before i times after i: everything but nums[i]  # @viz combine
