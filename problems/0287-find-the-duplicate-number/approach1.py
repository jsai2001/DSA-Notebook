class Solution(object):
    def findDuplicate(self, nums):
        seen = set()  # @viz init
        for x in nums:  # @viz loop
            if x in seen:  # met before  # @viz found
                return x  # @viz found
            seen.add(x)  # @viz add
