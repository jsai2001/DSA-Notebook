class Solution(object):
    def maxCoins(self, nums):
        n = len(nums)  # @viz init
        memo = {}  # remaining balloons (as a bitmask) -> the most coins from bursting them all  # @viz init
        def best(mask):  # @viz call
            if mask == 0:  # @viz base
                return 0  # @viz base
            if mask not in memo:  # @viz memo
                alive = [i for i in range(n) if mask >> i & 1]  # @viz memo
                top = 0  # @viz try
                for k, i in enumerate(alive):  # burst balloon i next: its neighbours are the nearest alive ones  # @viz try
                    left = nums[alive[k - 1]] if k > 0 else 1  # @viz try
                    right = nums[alive[k + 1]] if k + 1 < len(alive) else 1  # @viz try
                    top = max(top, left * nums[i] * right + best(mask & ~(1 << i)))  # @viz try
                memo[mask] = top  # @viz memo
            return memo[mask]  # @viz memo
        return best((1 << n) - 1)  # every balloon is still there  # @viz return
