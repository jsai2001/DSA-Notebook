class Solution(object):
    def trap(self, height):
        stack = []  # indices of bars whose heights go down from bottom to top  # @viz init
        total = 0  # @viz init
        for i, h in enumerate(height):  # @viz loop
            while stack and height[stack[-1]] < h:  # bar i is taller than the top: water can sit on the top bar  # @viz pop
                bottom = stack.pop()  # @viz pop
                if not stack:  # no wall on the left, so that water would run off  # @viz no-left
                    break  # @viz no-left
                left = stack[-1]  # @viz fill
                width = i - left - 1  # @viz fill
                depth = min(height[left], h) - height[bottom]  # @viz fill
                total += width * depth  # one horizontal layer of water between left and i  # @viz fill
            stack.append(i)  # @viz push
        return total  # @viz return
