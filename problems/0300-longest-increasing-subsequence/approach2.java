class Solution {
    public int lengthOfLIS(int[] nums) {
        int n = nums.length; // @viz init
        int[] dp = new int[n]; // dp[i] = the longest increasing subsequence that ends at nums[i] // @viz init
        int ans = 0; // @viz init
        for (int i = 0; i < n; i++) { // @viz end
            dp[i] = 1; // @viz end
            for (int j = 0; j < i; j++) // any smaller value before i can come just before nums[i] // @viz try
                if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1); // @viz try
            ans = Math.max(ans, dp[i]); // it can end anywhere // @viz return
        }
        return ans; // @viz return
    }
}
