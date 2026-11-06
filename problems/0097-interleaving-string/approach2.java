class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int m = s1.length(), n = s2.length(); // @viz init
        if (m + n != s3.length()) return false; // the letters have to add up // @viz len
        // dp[i][j]: can the first i letters of s1 and the first j of s2 make the first i + j of s3?
        boolean[][] dp = new boolean[m + 1][n + 1]; // @viz init
        dp[0][0] = true; // nothing from either makes the empty start // @viz init
        for (int i = 0; i <= m; i++) { // @viz loop
            for (int j = 0; j <= n; j++) { // @viz loop
                if (i > 0 && s1.charAt(i - 1) == s3.charAt(i + j - 1) && dp[i - 1][j]) // the last letter came from s1 // @viz from1
                    dp[i][j] = true; // @viz from1
                if (j > 0 && s2.charAt(j - 1) == s3.charAt(i + j - 1) && dp[i][j - 1]) // or from s2 // @viz from2
                    dp[i][j] = true; // @viz from2
            }
        }
        return dp[m][n]; // @viz answer
    }
}
