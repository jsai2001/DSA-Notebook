class Solution(object):
    def longestConsecutive(self, nums):
        if not nums:  # @viz init
            return 0  # @viz init
        nums = sorted(nums)  # @viz sort
        best = cur = 1  # @viz sort
        for i in range(1, len(nums)):  # @viz loop
            if nums[i] == nums[i - 1]:  # a repeat doesn't break the run  # @viz dup
                continue  # @viz dup
            if nums[i] == nums[i - 1] + 1:  # @viz extend
                cur += 1  # @viz extend
            else:  # @viz reset
                cur = 1  # a gap: a new run starts here  # @viz reset
            best = max(best, cur)  # @viz best
        return best  # @viz return
