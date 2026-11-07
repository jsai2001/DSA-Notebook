class Solution(object):
    def dailyTemperatures(self, temperatures):
        n = len(temperatures)  # @viz init
        ans = [0] * n  # @viz init
        for i in range(n - 2, -1, -1):  # right to left: the days after i are already solved  # @viz day
            j = i + 1  # @viz look
            while j < n and temperatures[j] <= temperatures[i]:  # day j isn't warmer...  # @viz jump
                j = j + ans[j] if ans[j] else n  # ...so jump straight to day j's own warmer day (or give up)  # @viz jump
            if j < n:  # @viz found
                ans[i] = j - i  # @viz found
        return ans  # @viz return
