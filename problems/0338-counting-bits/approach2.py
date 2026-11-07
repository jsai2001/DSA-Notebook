class Solution(object):
    def countBits(self, n):
        ans = [0] * (n + 1)  # ans[0] = 0  # @viz init
        for i in range(1, n + 1):  # @viz num
            ans[i] = ans[i & (i - 1)] + 1  # i with its lowest 1 cleared is smaller and already known  # @viz store
        return ans  # @viz return
