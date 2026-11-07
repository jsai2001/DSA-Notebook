class Solution {
    public int rob(int[] nums) {
        int n = nums.length; // @viz init
        if (n == 1) return nums[0]; // one house: it has no neighbours // @viz one
        return Math.max(bestRange(nums, 0, n - 2), bestRange(nums, 1, n - 1)); // without the last house, or without the first // @viz answer
    }
    private int bestRange(int[] nums, int lo, int hi) { // House Robber on nums[lo..hi] // @viz range
        int m = hi - lo + 1; // @viz range
        int[] dp = new int[m + 1]; // dp[i] = the most from the first i houses of the range // @viz range
        dp[1] = nums[lo]; // @viz range
        for (int i = 2; i <= m; i++) // @viz loop
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[lo + i - 1]); // @viz choose
        return dp[m]; // @viz range
    }
}
