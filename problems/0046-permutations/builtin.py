from itertools import permutations
class Solution(object):
    def permute(self, nums):
        return [list(p) for p in permutations(nums)]  # tuples -> lists
