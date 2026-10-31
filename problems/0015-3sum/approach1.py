class Solution(object):
    def threeSum(self, nums):
        n = len(nums)  # @viz init
        found = set()  # sorted triplets, so [-1, 0, 1] and [0, 1, -1] count once  # @viz init
        for i in range(n):  # @viz pick
            for j in range(i + 1, n):  # @viz pick
                for k in range(j + 1, n):  # @viz pick
                    if nums[i] + nums[j] + nums[k] == 0:  # @viz check
                        found.add(tuple(sorted((nums[i], nums[j], nums[k]))))  # @viz found
        return [list(t) for t in found]  # @viz return
