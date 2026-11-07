class Solution {
    public int maxCoins(int[] nums) {
        int m = nums.length + 2; // @viz init
        int[] a = new int[m]; // padding: the ends act like balloons worth 1 that never burst // @viz init
        a[0] = a[m - 1] = 1; // @viz init
        System.arraycopy(nums, 0, a, 1, nums.length); // @viz init
        int[][] dp = new int[m][m]; // dp[lo][hi] = the most coins from the balloons strictly between lo and hi // @viz init
        for (int gap = 2; gap < m; gap++) // short intervals first, so the parts are ready // @viz gap
            for (int lo = 0; lo + gap < m; lo++) { // @viz gap
                int hi = lo + gap; // @viz gap
                for (int k = lo + 1; k < hi; k++) // k is burst last // @viz last
                    dp[lo][hi] = Math.max(dp[lo][hi], dp[lo][k] + a[lo] * a[k] * a[hi] + dp[k][hi]); // @viz last
            }
        return dp[0][m - 1]; // @viz return
    }
}
