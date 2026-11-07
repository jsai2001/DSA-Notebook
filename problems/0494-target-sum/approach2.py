class Solution(object):
    def findTargetSumWays(self, nums, target):
        count = {0: 1}  # running total -> number of sign choices that reach it  # @viz init
        for x in nums:  # @viz step
            nxt = {}  # @viz step
            for total, c in count.items():  # each total splits into total + x and total - x  # @viz step
                nxt[total + x] = nxt.get(total + x, 0) + c  # @viz step
                nxt[total - x] = nxt.get(total - x, 0) + c  # @viz step
            count = nxt  # @viz step
        return count.get(target, 0)  # @viz return
