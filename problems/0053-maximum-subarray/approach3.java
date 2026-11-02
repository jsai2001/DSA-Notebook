class Solution {
    public int maxSubArray(int[] nums) {
        int best = nums[0], cur = nums[0]; // cur: the largest sum of a subarray that ends here // @viz init
        for (int i = 1; i < nums.length; i++) { // @viz loop
            cur = Math.max(nums[i], cur + nums[i]); // extend the run, or start again here if the run so far is negative // @viz cur
            best = Math.max(best, cur); // @viz best
        }
        return best; // @viz return
    }
}
