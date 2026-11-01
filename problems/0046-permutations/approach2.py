class Solution(object):
    def permute(self, nums):
        nums = nums[:]  # work on a copy  # @viz init
        result = []  # @viz init
        def backtrack(k):  # positions 0..k-1 are fixed; choose what goes at position k  # @viz call
            if k == len(nums):  # @viz done
                result.append(nums[:])  # @viz done
                return  # @viz done
            for i in range(k, len(nums)):  # any number not fixed yet can go at k  # @viz swap
                nums[k], nums[i] = nums[i], nums[k]  # bring nums[i] to position k  # @viz swap
                backtrack(k + 1)  # @viz swap
                nums[k], nums[i] = nums[i], nums[k]  # swap back, so the order is restored  # @viz undo
        backtrack(0)  # @viz init
        return result  # @viz return
