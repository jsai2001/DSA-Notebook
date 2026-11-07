class Solution(object):
    def lengthOfLIS(self, nums):
        dp = [1] * len(nums)  # dp[i] = the longest increasing subsequence that ends at nums[i]  # @viz init
        for i in range(len(nums)):  # @viz end
            for j in range(i):  # any smaller value before i can come just before nums[i]  # @viz try
                if nums[j] < nums[i]:  # @viz try
                    dp[i] = max(dp[i], dp[j] + 1)  # @viz try
        return max(dp)  # it can end anywhere  # @viz return
