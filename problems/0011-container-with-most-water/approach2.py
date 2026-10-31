class Solution(object):
    def maxArea(self, height):
        left, right = 0, len(height) - 1  # start as wide as possible  # @viz init
        best = 0  # @viz init
        while left < right:  # @viz loop
            area = min(height[left], height[right]) * (right - left)  # @viz area
            best = max(best, area)  # @viz best
            # Every narrower container that keeps the shorter line is no taller
            # and narrower, so it can't beat this one: drop the shorter line.
            if height[left] < height[right]:  # @viz move
                left += 1  # @viz moveleft
            else:
                right -= 1  # @viz moveright
        return best  # @viz return
