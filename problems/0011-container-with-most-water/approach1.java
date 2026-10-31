class Solution {
    public int maxArea(int[] height) {
        int n = height.length; // @viz init
        int best = 0; // @viz init
        for (int i = 0; i < n; i++) { // @viz pair
            for (int j = i + 1; j < n; j++) { // @viz pair
                int area = Math.min(height[i], height[j]) * (j - i); // water is as high as the shorter line // @viz area
                best = Math.max(best, area); // @viz best
            }
        }
        return best; // @viz return
    }
}
