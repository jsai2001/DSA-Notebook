class Solution(object):
    def subsets(self, nums):
        result, path = [], []  # @viz init
        def backtrack(start):  # path is a subset; extend it only with numbers after it  # @viz call
            result.append(path[:])  # every path is an answer, even the empty one  # @viz record
            for i in range(start, len(nums)):  # @viz choose
                path.append(nums[i])  # @viz choose
                backtrack(i + 1)  # only later numbers next, so no subset repeats  # @viz choose
                path.pop()  # undo, so the next number can take this place  # @viz undo
        backtrack(0)  # @viz init
        return result  # @viz return
