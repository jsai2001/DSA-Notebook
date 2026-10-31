class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1; // start as wide as possible // @viz init
        int best = 0; // @viz init
        while (left < right) { // @viz loop
            int area = Math.min(height[left], height[right]) * (right - left); // @viz area
            best = Math.max(best, area); // @viz best
            // Every narrower container that keeps the shorter line is no taller
            // and narrower, so it can't beat this one: drop the shorter line.
            if (height[left] < height[right]) { // @viz move
                left++; // @viz moveleft
            } else {
                right--; // @viz moveright
            }
        }
        return best; // @viz return
    }
}
