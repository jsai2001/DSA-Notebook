class Solution {
    public boolean canPartition(int[] nums) {
        int total = 0; // @viz init
        for (int x : nums) total += x; // @viz init
        if (total % 2 != 0) return false; // an odd total can't split into two equal halves // @viz init
        int half = total / 2; // @viz init
        boolean[] dp = new boolean[half + 1]; // dp[s]: some of the numbers so far add up to s // @viz init
        dp[0] = true; // @viz init
        for (int x : nums) { // @viz num
            for (int s = half; s >= x; s--) // downwards, so x is used at most once // @viz fill
                dp[s] |= dp[s - x]; // @viz fill
            if (dp[half]) return true; // @viz found
        }
        return false; // @viz return
    }
}
