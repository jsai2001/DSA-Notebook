class Solution(object):
    def findKthLargest(self, nums, k):
        nums = sorted(nums, reverse=True)  # biggest first  # @viz sort
        return nums[k - 1]  # the k-th one (k is 1-based)  # @viz pick
