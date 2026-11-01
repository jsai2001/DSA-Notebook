import java.util.Arrays;
class Solution {
    public int jump(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n]; // dp[i]: fewest jumps to reach i (n means "not reached yet") // @viz init
        Arrays.fill(dp, n); // @viz init
        dp[0] = 0; // @viz init
        for (int i = 0; i < n; i++) // @viz from
            for (int j = i + 1; j <= Math.min(n - 1, i + nums[i]); j++) // every index one jump from i // @viz relax
                dp[j] = Math.min(dp[j], dp[i] + 1); // @viz relax
        return dp[n - 1]; // @viz return
    }
}
