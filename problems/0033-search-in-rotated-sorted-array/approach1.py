class Solution(object):
    def search(self, nums, target):
        for i, x in enumerate(nums):  # look at every value, left to right  # @viz loop
            if x == target:  # @viz check
                return i  # @viz found
        return -1  # not in the array  # @viz missing
