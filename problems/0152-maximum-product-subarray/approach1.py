class Solution(object):
    def maxProduct(self, nums):
        best = nums[0]  # not 0: the answer can be negative  # @viz init
        for i in range(len(nums)):  # every start  # @viz start
            prod = 1  # @viz start
            for j in range(i, len(nums)):  # extend to every end, keeping a running product  # @viz extend
                prod *= nums[j]  # @viz extend
                best = max(best, prod)  # @viz best
        return best  # @viz return
