class Solution(object):
    def trap(self, height):
        total = 0  # @viz init
        for i in range(len(height)):  # @viz loop
            left_max = max(height[: i + 1])  # tallest bar from the start up to i  # @viz left
            right_max = max(height[i:])  # tallest bar from i to the end  # @viz right
            total += min(left_max, right_max) - height[i]  # water stands as high as the lower of the two walls  # @viz add
        return total  # @viz return
