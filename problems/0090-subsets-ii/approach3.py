class Solution(object):
    def subsetsWithDup(self, nums):
        nums = sorted(nums)  # equal numbers side by side  # @viz init
        result = [[]]  # @viz init
        added = 0  # where the subsets made in the last round start  # @viz init
        for i, x in enumerate(nums):  # @viz next
            # A repeat of the last number only extends the subsets that already used it (made last round).
            begin = added if i > 0 and x == nums[i - 1] else 0  # @viz begin
            added = len(result)  # @viz begin
            for j in range(begin, added):  # @viz extend
                result.append(result[j] + [x])  # @viz extend
        return result  # @viz return
