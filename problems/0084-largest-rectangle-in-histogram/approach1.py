class Solution(object):
    def largestRectangleArea(self, heights):
        best = 0  # @viz init
        for i in range(len(heights)):  # left edge  # @viz start
            low = heights[i]  # the shortest bar in heights[i..j] sets the height  # @viz start
            for j in range(i, len(heights)):  # right edge  # @viz grow
                low = min(low, heights[j])  # @viz grow
                best = max(best, low * (j - i + 1))  # @viz area
        return best  # @viz return
