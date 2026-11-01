class Solution(object):
    def jump(self, nums):
        jumps = 0  # @viz init
        end = 0  # the last index reachable with `jumps` jumps  # @viz init
        farthest = 0  # the furthest index reachable with one more jump  # @viz init
        for i in range(len(nums) - 1):  # not the last index: standing there needs no more jumps  # @viz scan
            farthest = max(farthest, i + nums[i])  # @viz scan
            if i == end:  # every index of this jump count has been looked at  # @viz level
                jumps += 1  # take one more jump  # @viz level
                end = farthest  # it can land anywhere up to farthest  # @viz level
        return jumps  # @viz return
