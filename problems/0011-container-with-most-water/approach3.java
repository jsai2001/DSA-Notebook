class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1; // @viz init
        int best = 0; // @viz init
        while (left < right) { // @viz loop
            int h = Math.min(height[left], height[right]); // @viz area
            best = Math.max(best, h * (right - left)); // @viz best
            // A line no taller than h, closer in, can only give a smaller
            // container: skip all of them on both sides in one go.
            while (left < right && height[left] <= h) left++; // @viz skipleft
            while (left < right && height[right] <= h) right--; // @viz skipright
        }
        return best; // @viz return
    }
}
