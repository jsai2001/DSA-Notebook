class Solution(object):
    def maxArea(self, height):
        left, right = 0, len(height) - 1  # @viz init
        best = 0  # @viz init
        while left < right:  # @viz loop
            h = min(height[left], height[right])  # @viz area
            best = max(best, h * (right - left))  # @viz best
            # A line no taller than h, closer in, can only give a smaller
            # container: skip all of them on both sides in one go.
            while left < right and height[left] <= h:  # @viz skipleft
                left += 1  # @viz skipleft
            while left < right and height[right] <= h:  # @viz skipright
                right -= 1  # @viz skipright
        return best  # @viz return
