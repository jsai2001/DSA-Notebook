class Solution(object):
    def canJump(self, nums):
        goal = len(nums) - 1  # the leftmost index known to reach the end  # @viz init
        for i in range(len(nums) - 2, -1, -1):  # right to left  # @viz scan
            if i + nums[i] >= goal:  # i can land on goal: any jump up to nums[i] is allowed  # @viz scan
                goal = i  # so reaching i is enough  # @viz move
        return goal == 0  # @viz return
