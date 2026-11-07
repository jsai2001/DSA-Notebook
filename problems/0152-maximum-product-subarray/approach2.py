class Solution(object):
    def maxProduct(self, nums):
        n = len(nums)  # @viz init
        best = nums[0]  # @viz init
        left = right = 1  # @viz init
        for i in range(n):  # @viz scan
            # A product restarts after a 0 (multiplying by 0 would stick at 0).
            left = (left if left != 0 else 1) * nums[i]  # from the left: the prefix ending at i  # @viz scan
            right = (right if right != 0 else 1) * nums[n - 1 - i]  # from the right: the suffix starting at n-1-i  # @viz scan
            best = max(best, left, right)  # @viz best
        return best  # @viz return
