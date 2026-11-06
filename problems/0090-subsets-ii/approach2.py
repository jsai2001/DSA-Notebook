class Solution(object):
    def subsetsWithDup(self, nums):
        nums = sorted(nums)  # equal numbers side by side  # @viz init
        result, path = [], []  # @viz init
        def backtrack(start):  # path is a subset; extend it only with numbers after it  # @viz call
            result.append(path[:])  # every path is an answer, even the empty one  # @viz record
            for i in range(start, len(nums)):  # @viz choose
                if i > start and nums[i] == nums[i - 1]:  # same number in the same place: same subsets again  # @viz dup
                    continue  # @viz dup
                path.append(nums[i])  # @viz choose
                backtrack(i + 1)  # @viz choose
                path.pop()  # undo, so the next number can take this place  # @viz undo
        backtrack(0)  # @viz init
        return result  # @viz return
