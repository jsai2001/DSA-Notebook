class Solution {
    public int trap(int[] height) {
        int n = height.length;
        int[] leftMax = new int[n], rightMax = new int[n]; // leftMax[i]: tallest in height[0..i]; rightMax[i]: tallest in height[i..n-1] // @viz left
        leftMax[0] = height[0]; // @viz left
        for (int i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i - 1], height[i]); // @viz left
        rightMax[n - 1] = height[n - 1]; // @viz right
        for (int i = n - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], height[i]); // @viz right
        int total = 0; // @viz add
        for (int i = 0; i < n; i++) total += Math.min(leftMax[i], rightMax[i]) - height[i]; // the same formula, now O(1) per bar // @viz add
        return total; // @viz return
    }
}
