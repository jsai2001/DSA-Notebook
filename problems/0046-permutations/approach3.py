class Solution(object):
    def permute(self, nums):
        perms = [[]]  # all permutations of the numbers seen so far (none yet: one empty one)  # @viz init
        for x in nums:  # @viz next
            grown = []  # @viz next
            for p in perms:  # @viz insert
                for pos in range(len(p) + 1):  # put x in every gap: before, between, after  # @viz insert
                    grown.append(p[:pos] + [x] + p[pos:])  # @viz insert
            perms = grown  # k numbers -> k! permutations  # @viz next
        return perms  # @viz return
