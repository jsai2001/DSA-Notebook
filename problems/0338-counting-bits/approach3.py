class Solution(object):
    def countBits(self, n):
        ans = [0] * (n + 1)  # ans[0] = 0  # @viz init
        for i in range(1, n + 1):  # @viz num
            ans[i] = ans[i >> 1] + (i & 1)  # i without its last bit, plus that last bit  # @viz store
        return ans  # @viz return
