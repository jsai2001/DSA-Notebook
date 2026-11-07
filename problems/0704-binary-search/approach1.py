class Solution(object):
    def search(self, nums, target):
        for i, x in enumerate(nums):  # check every value, left to right  # @viz scan
            if x == target:  # @viz found
                return i  # @viz found
        return -1  # @viz none
