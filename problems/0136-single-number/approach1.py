class Solution(object):
    def singleNumber(self, nums):
        count = {}  # @viz init
        for x in nums:  # @viz count
            count[x] = count.get(x, 0) + 1  # @viz count
        for x, c in count.items():  # @viz find
            if c == 1:  # the one value seen once  # @viz find
                return x  # @viz find
