class Solution(object):
    def findMin(self, nums):
        best = nums[0]  # @viz init
        for x in nums:  # look at every number  # @viz scan
            if x < best:  # @viz scan
                best = x  # @viz scan
        return best  # @viz return
