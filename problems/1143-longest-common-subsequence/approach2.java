class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length(); // @viz init
        int[][] dp = new int[m + 1][n + 1]; // dp[i][j] = LCS of the first i letters and the first j letters // @viz init
        for (int i = 1; i <= m; i++) // @viz row
            for (int j = 1; j <= n; j++) // @viz cell
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1] + 1; // the last letters match: extend the diagonal // @viz same
                else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // drop the last letter of one of them // @viz diff
        return dp[m][n]; // @viz return
    }
}
