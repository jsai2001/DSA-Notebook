class Solution(object):
    def trap(self, height):
        left, right = 0, len(height) - 1  # @viz init
        left_max = right_max = 0  # tallest bar seen so far from each end  # @viz init
        total = 0  # @viz init
        while left < right:  # @viz loop
            # the lower end decides: the other side already has a wall at least as tall
            if height[left] < height[right]:  # @viz move-left, move-right
                left_max = max(left_max, height[left])  # @viz move-left
                total += left_max - height[left]  # @viz move-left
                left += 1  # @viz move-left
            else:  # @viz move-right
                right_max = max(right_max, height[right])  # @viz move-right
                total += right_max - height[right]  # @viz move-right
                right -= 1  # @viz move-right
        return total  # @viz return
