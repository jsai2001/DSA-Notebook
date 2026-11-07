class Solution(object):
    def maxSlidingWindow(self, nums, k):
        res = []  # @viz init
        for i in range(len(nums) - k + 1):  # every window start  # @viz window
            res.append(max(nums[i:i + k]))  # look at all k values again  # @viz window
        return res  # @viz return
