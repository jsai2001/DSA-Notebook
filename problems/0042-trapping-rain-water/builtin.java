import java.util.Arrays;
class Solution {
    public int trap(int[] height) {
        int n = height.length;
        int[] leftMax = height.clone();
        Arrays.parallelPrefix(leftMax, Math::max); // running maximum from the left
        int[] rightMax = new int[n]; // height reversed, then the same running maximum
        for (int i = 0; i < n; i++) rightMax[i] = height[n - 1 - i];
        Arrays.parallelPrefix(rightMax, Math::max); // rightMax[n - 1 - i]: tallest in height[i..n-1]
        int total = 0;
        for (int i = 0; i < n; i++) total += Math.min(leftMax[i], rightMax[n - 1 - i]) - height[i];
        return total;
    }
}
