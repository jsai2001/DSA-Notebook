class Solution(object):
    def maxArea(self, height):
        n = len(height)  # @viz init
        best = 0  # @viz init
        for i in range(n):  # @viz pair
            for j in range(i + 1, n):  # @viz pair
                area = min(height[i], height[j]) * (j - i)  # water is as high as the shorter line  # @viz area
                best = max(best, area)  # @viz best
        return best  # @viz return
