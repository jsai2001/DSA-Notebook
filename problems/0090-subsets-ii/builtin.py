from itertools import combinations
class Solution(object):
    def subsetsWithDup(self, nums):
        nums = sorted(nums)  # so equal subsets become equal tuples
        # combinations repeats subsets when nums has repeats; the set keeps one of each
        return [list(c) for c in {c for r in range(len(nums) + 1) for c in combinations(nums, r)}]
