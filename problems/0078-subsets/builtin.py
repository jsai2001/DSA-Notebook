from itertools import combinations
class Solution(object):
    def subsets(self, nums):
        # all subsets of size 0, then size 1, ... up to size n
        return [list(c) for r in range(len(nums) + 1) for c in combinations(nums, r)]
