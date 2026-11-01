class Solution(object):
    def trap(self, height):
        n = len(height)
        left_max = [0] * n  # left_max[i]: tallest bar in height[0..i]  # @viz left
        left_max[0] = height[0]  # @viz left
        for i in range(1, n):  # @viz left
            left_max[i] = max(left_max[i - 1], height[i])  # @viz left
        right_max = [0] * n  # right_max[i]: tallest bar in height[i..n-1]  # @viz right
        right_max[n - 1] = height[n - 1]  # @viz right
        for i in range(n - 2, -1, -1):  # @viz right
            right_max[i] = max(right_max[i + 1], height[i])  # @viz right
        total = 0  # @viz add
        for i in range(n):  # @viz add
            total += min(left_max[i], right_max[i]) - height[i]  # the same formula, now O(1) per bar  # @viz add
        return total  # @viz return
