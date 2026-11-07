class Solution(object):
    def missingNumber(self, nums):
        nums = sorted(nums)  # @viz sort
        for i, x in enumerate(nums):  # sorted, the value at index i should be i  # @viz scan
            if x != i:  # the first gap  # @viz found
                return i  # @viz found
        return len(nums)  # 0..n-1 are all there: n is missing  # @viz end
