class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int[] res = new int[nums.length - k + 1]; // @viz init
        for (int i = 0; i + k <= nums.length; i++) { // every window start // @viz window
            int best = nums[i]; // @viz window
            for (int j = i + 1; j < i + k; j++) best = Math.max(best, nums[j]); // look at all k values again // @viz window
            res[i] = best; // @viz window
        }
        return res; // @viz return
    }
}
