class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1; // @viz init
        int leftMax = 0, rightMax = 0; // tallest bar seen so far from each end // @viz init
        int total = 0; // @viz init
        while (left < right) { // @viz loop
            // the lower end decides: the other side already has a wall at least as tall
            if (height[left] < height[right]) { // @viz move-left, move-right
                leftMax = Math.max(leftMax, height[left]); // @viz move-left
                total += leftMax - height[left]; // @viz move-left
                left++; // @viz move-left
            } else { // @viz move-right
                rightMax = Math.max(rightMax, height[right]); // @viz move-right
                total += rightMax - height[right]; // @viz move-right
                right--; // @viz move-right
            }
        }
        return total; // @viz return
    }
}
