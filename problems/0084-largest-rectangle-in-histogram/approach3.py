class Solution(object):
    def largestRectangleArea(self, heights):
        n = len(heights)  # @viz init
        stack = []  # indices; their heights go up from bottom to top  # @viz init
        best = 0  # @viz init
        for i in range(n + 1):  # i == n is a bar of height 0 that empties the stack  # @viz loop
            h = heights[i] if i < n else 0  # @viz loop
            while stack and heights[stack[-1]] >= h:  # bar i is a right wall for the top bar  # @viz pop
                top = heights[stack.pop()]  # @viz pop
                left = stack[-1] if stack else -1  # the bar below it is shorter: its left wall  # @viz width
                best = max(best, top * (i - left - 1))  # it spans left+1 .. i-1  # @viz width
            stack.append(i)  # @viz push
        return best  # @viz return
