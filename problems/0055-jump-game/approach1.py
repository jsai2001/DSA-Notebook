class Solution(object):
    def canJump(self, nums):
        n = len(nums)
        good = [False] * n  # good[i]: the last index can be reached from i  # @viz init
        good[n - 1] = True  # standing on it already counts  # @viz init
        for i in range(n - 2, -1, -1):  # right to left, so every good[j] after i is known  # @viz from
            for j in range(i + 1, min(n - 1, i + nums[i]) + 1):  # every index one jump from i  # @viz check
                if good[j]:  # @viz check
                    good[i] = True  # @viz found
                    break  # one good landing spot is enough  # @viz found
        return good[0]  # @viz return
