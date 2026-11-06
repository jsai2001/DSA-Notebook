class Solution {
    public int numDistinct(String s, String t) {
        int n = t.length(); // @viz init
        // Plain int is fine: overflow on the way wraps modulo 2^32, and with only additions the final answer is still exact.
        int[] dp = new int[n + 1]; // one row: dp[j] = ways to spell t[:j] with the letters of s seen so far // @viz init
        dp[0] = 1; // @viz init
        for (char ch : s.toCharArray()) { // @viz loop
            for (int j = n; j >= 1; j--) { // right to left, so dp[j - 1] still holds the value from before this letter // @viz loop
                if (t.charAt(j - 1) == ch) dp[j] += dp[j - 1]; // @viz use
            }
        }
        return dp[n]; // @viz answer
    }
}
