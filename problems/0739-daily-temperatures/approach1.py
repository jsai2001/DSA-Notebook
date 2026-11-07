class Solution(object):
    def dailyTemperatures(self, temperatures):
        n = len(temperatures)  # @viz init
        ans = [0] * n  # 0 when no warmer day comes  # @viz init
        for i in range(n):  # @viz day
            for j in range(i + 1, n):  # look ahead, day by day  # @viz look
                if temperatures[j] > temperatures[i]:  # the first warmer day  # @viz found
                    ans[i] = j - i  # @viz found
                    break  # @viz found
        return ans  # @viz return
