class Solution(object):
    def canPartition(self, nums):
        total = sum(nums)
        if total % 2:
            return False
        bits = 1  # bit s is set when sum s is reachable; Python ints grow as needed
        for x in nums:
            bits |= bits << x  # every reachable sum, with x added: the whole DP row in one shift
        return bool(bits >> (total // 2) & 1)
