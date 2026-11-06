class Solution {
    public int numDistinct(String s, String t) {
        int m = s.length(), n = t.length(); // @viz init
        // dp[i][j]: ways to spell the first j letters of t using the first i letters of s.
        // Plain int is fine: Java's int overflow wraps modulo 2^32, and with only additions the final answer
        // (which fits in an int) still comes out exact, even if values on the way don't fit.
        int[][] dp = new int[m + 1][n + 1]; // @viz init
        for (int i = 0; i <= m; i++) dp[i][0] = 1; // the empty start of t: one way (use nothing) // @viz init
        for (int i = 1; i <= m; i++) { // @viz loop
            for (int j = 1; j <= n; j++) { // @viz loop
                dp[i][j] = dp[i - 1][j]; // don't use s[i-1] // @viz skip
                if (s.charAt(i - 1) == t.charAt(j - 1)) // @viz use
                    dp[i][j] += dp[i - 1][j - 1]; // use s[i-1] as the j-th letter of t // @viz use
            }
        }
        return dp[m][n]; // @viz answer
    }
}
