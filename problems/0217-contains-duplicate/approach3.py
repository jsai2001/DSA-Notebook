class Solution(object):
    def containsDuplicate(self, nums):
        seen = set()  # values met so far  # @viz init
        for x in nums:  # @viz loop
            if x in seen:  # met before: a duplicate  # @viz found
                return True  # @viz found
            seen.add(x)  # @viz add
        return False  # @viz none
