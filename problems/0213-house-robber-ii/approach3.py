class Solution(object):
    def rob(self, nums):
        if len(nums) == 1:  # one house: it has no neighbours  # @viz one
            return nums[0]  # @viz one
        def best_line(houses):  # House Robber on a straight street  # @viz range
            prev, cur = 0, 0  # @viz range
            for x in houses:  # @viz loop
                prev, cur = cur, max(cur, prev + x)  # skip this house, or rob it on top of prev  # @viz choose
            return cur  # @viz range
        return max(best_line(nums[:-1]), best_line(nums[1:]))  # the first and last houses touch: leave out one of them  # @viz answer
