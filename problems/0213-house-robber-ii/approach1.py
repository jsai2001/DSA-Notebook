class Solution(object):
    def rob(self, nums):
        n = len(nums)  # @viz init
        if n == 1:  # one house: it has no neighbours  # @viz one
            return nums[0]  # @viz one
        def best_range(lo, hi):  # House Robber on nums[lo..hi], with a memo  # @viz range
            memo = {}  # @viz range
            def best(i):  # the most from houses i..hi  # @viz call
                if i > hi:  # @viz base
                    return 0  # @viz base
                if i not in memo:  # @viz memo
                    memo[i] = max(best(i + 1), nums[i] + best(i + 2))  # skip house i, or rob it  # @viz choose
                return memo[i]  # @viz memo
            return best(lo)  # @viz range
        return max(best_range(0, n - 2), best_range(1, n - 1))  # the first and last houses touch: leave out one of them  # @viz answer
