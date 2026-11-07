class Solution(object):
    def productExceptSelf(self, nums):
        n = len(nums)  # @viz init
        ans = []  # @viz init
        for i in range(n):  # @viz each
            p = 1  # @viz each
            for j in range(n):  # multiply everything except nums[i]  # @viz mult
                if j != i:  # @viz mult
                    p *= nums[j]  # @viz mult
            ans.append(p)  # @viz store
        return ans  # @viz return
