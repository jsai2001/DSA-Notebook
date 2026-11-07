class Solution(object):
    def productExceptSelf(self, nums):
        n = len(nums)  # @viz init
        ans = [1] * n  # @viz init
        for i in range(1, n):  # first pass: ans[i] = the product of everything before i  # @viz left
            ans[i] = ans[i - 1] * nums[i - 1]  # @viz left
        right = 1  # the product of everything after i, kept in one number  # @viz right
        for i in range(n - 1, -1, -1):  # second pass, from the back  # @viz right
            ans[i] *= right  # @viz right
            right *= nums[i]  # @viz right
        return ans  # @viz return
