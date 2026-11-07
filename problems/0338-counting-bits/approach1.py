class Solution(object):
    def countBits(self, n):
        ans = []  # @viz init
        for i in range(n + 1):  # count each number on its own  # @viz num
            x, c = i, 0  # @viz num
            while x:  # one round per 1 bit  # @viz clear
                x &= x - 1  # clear the lowest 1  # @viz clear
                c += 1  # @viz clear
            ans.append(c)  # @viz store
        return ans  # @viz return
