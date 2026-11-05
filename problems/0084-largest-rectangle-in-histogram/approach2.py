class Solution(object):
    def largestRectangleArea(self, heights):
        n = len(heights)  # @viz init
        left = [-1] * n  # left[i]: nearest bar to the left that is shorter than bar i (-1 = none)  # @viz init
        right = [n] * n  # right[i]: nearest shorter bar to the right (n = none)  # @viz init
        stack = []  # indices; their heights go up from bottom to top  # @viz init
        for i in range(n):  # @viz leftpass
            while stack and heights[stack[-1]] >= heights[i]:  # not shorter: can't be anyone's left wall  # @viz leftpass
                stack.pop()  # @viz leftpass
            left[i] = stack[-1] if stack else -1  # @viz leftpass
            stack.append(i)  # @viz leftpass
        stack = []  # @viz rightpass
        for i in range(n - 1, -1, -1):  # the same, from the right  # @viz rightpass
            while stack and heights[stack[-1]] >= heights[i]:  # @viz rightpass
                stack.pop()  # @viz rightpass
            right[i] = stack[-1] if stack else n  # @viz rightpass
            stack.append(i)  # @viz rightpass
        best = 0  # @viz area
        for i in range(n):  # the widest rectangle as tall as bar i spans left[i]+1 .. right[i]-1  # @viz area
            best = max(best, heights[i] * (right[i] - left[i] - 1))  # @viz area
        return best  # @viz return
