class Solution(object):
    def dailyTemperatures(self, temperatures):
        ans = [0] * len(temperatures)  # @viz init
        stack = []  # days still waiting for a warmer day; their temperatures go down from bottom to top  # @viz init
        for i, t in enumerate(temperatures):  # @viz day
            while stack and temperatures[stack[-1]] < t:  # today is warmer than the day on top  # @viz pop
                j = stack.pop()  # @viz pop
                ans[j] = i - j  # its wait is over  # @viz pop
            stack.append(i)  # today waits too  # @viz push
        return ans  # days left on the stack never get a warmer day: 0  # @viz return
