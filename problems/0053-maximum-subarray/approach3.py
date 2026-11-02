class Solution(object):
    def maxSubArray(self, nums):
        best = cur = nums[0]  # cur: the largest sum of a subarray that ends here  # @viz init
        for i in range(1, len(nums)):  # @viz loop
            cur = max(nums[i], cur + nums[i])  # extend the run, or start again here if the run so far is negative  # @viz cur
            best = max(best, cur)  # @viz best
        return best  # @viz return
