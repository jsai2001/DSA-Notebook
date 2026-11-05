class Solution(object):
    def subsets(self, nums):
        n = len(nums)  # @viz init
        result = []  # @viz init
        for mask in range(1 << n):  # 2^n masks, one per subset  # @viz mask
            subset = []  # @viz mask
            for i in range(n):  # @viz bit
                if mask >> i & 1:  # bit i is 1: nums[i] is in this subset  # @viz bit
                    subset.append(nums[i])  # @viz bit
            result.append(subset)  # @viz add
        return result  # @viz return
