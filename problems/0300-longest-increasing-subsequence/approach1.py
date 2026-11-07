import sys
sys.setrecursionlimit(10000)  # one call per index: up to 2500 deep
class Solution(object):
    def lengthOfLIS(self, nums):
        n = len(nums)  # @viz init
        memo = {}  # @viz init
        def longest(i):  # the longest increasing subsequence that starts with nums[i]  # @viz call
            if i not in memo:  # @viz memo
                best = 1  # nums[i] alone  # @viz memo
                for j in range(i + 1, n):  # try every bigger value after it as the next one  # @viz try
                    if nums[j] > nums[i]:  # @viz try
                        best = max(best, 1 + longest(j))  # @viz try
                memo[i] = best  # @viz store
            return memo[i]  # @viz store
        return max(longest(i) for i in range(n))  # it can start anywhere  # @viz return
