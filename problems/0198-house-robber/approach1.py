class Solution(object):
    def rob(self, nums):
        memo = {}  # i -> the most you can take from houses i, i + 1, ...  # @viz init
        def best(i):  # @viz call
            if i >= len(nums):  # no houses left  # @viz base
                return 0  # @viz base
            if i not in memo:  # @viz memo
                memo[i] = max(best(i + 1), nums[i] + best(i + 2))  # skip house i, or rob it and skip i + 1  # @viz choose
            return memo[i]  # @viz memo
        return best(0)  # @viz answer
