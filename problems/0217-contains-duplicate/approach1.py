class Solution(object):
    def containsDuplicate(self, nums):
        n = len(nums)  # @viz init
        for i in range(n):  # compare every pair once  # @viz pair
            for j in range(i + 1, n):  # @viz pair
                if nums[i] == nums[j]:  # @viz found
                    return True  # @viz found
        return False  # @viz none
