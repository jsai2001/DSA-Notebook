import bisect
class Solution(object):
    def search(self, nums, target):
        i = bisect.bisect_left(nums, target)  # the first index whose value is >= target
        return i if i < len(nums) and nums[i] == target else -1
