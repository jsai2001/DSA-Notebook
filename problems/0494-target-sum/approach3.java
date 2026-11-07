class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int total = 0; // P − N = target and P + N = total, so P = (total + target) / 2 // @viz init
        for (int x : nums) total += x; // @viz init
        if (Math.abs(target) > total || (total + target) % 2 != 0) return 0; // @viz init
        int p = (total + target) / 2; // @viz init
        int[] dp = new int[p + 1]; // dp[s]: ways to pick some numbers so far that add up to s // @viz init
        dp[0] = 1; // @viz init
        for (int x : nums) // @viz num
            for (int s = p; s >= x; s--) dp[s] += dp[s - x]; // downwards, so x is used at most once // @viz fill
        return dp[p]; // @viz return
    }
}
