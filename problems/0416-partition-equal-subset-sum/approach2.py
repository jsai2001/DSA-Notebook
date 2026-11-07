class Solution(object):
    def canPartition(self, nums):
        total = sum(nums)  # @viz init
        if total % 2:  # an odd total can't split into two equal halves  # @viz init
            return False  # @viz init
        half = total // 2  # @viz init
        sums = {0}  # every subset sum reachable so far  # @viz init
        for x in nums:  # @viz add
            sums |= {s + x for s in sums if s + x <= half}  # each old sum, with x added  # @viz add
            if half in sums:  # @viz found
                return True  # @viz found
        return False  # @viz return
