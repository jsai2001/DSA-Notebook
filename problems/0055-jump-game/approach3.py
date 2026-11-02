class Solution(object):
    def canJump(self, nums):
        farthest = 0  # the furthest index reachable so far  # @viz init
        for i in range(len(nums)):  # @viz scan
            if i > farthest:  # nothing before i can jump this far: stuck  # @viz stuck
                return False  # @viz stuck
            farthest = max(farthest, i + nums[i])  # i is reachable, so so is everything up to i + nums[i]  # @viz reach
        return True  # @viz return
