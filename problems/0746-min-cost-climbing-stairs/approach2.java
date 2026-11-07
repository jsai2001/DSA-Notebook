class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int n = cost.length; // @viz init
        int[] dp = new int[n + 1]; // dp[i] = the cheapest way to stand on step i; dp[0] = dp[1] = 0 // @viz init
        for (int i = 2; i <= n; i++) // @viz loop
            dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]); // pay for the step you leave from // @viz choose
        return dp[n]; // step n is the top, past the last stair // @viz return
    }
}
