class Solution {
    public boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length(); // @viz init
        // dp[i][j]: does s[0..i) (first i chars) match p[0..j)?
        boolean[][] dp = new boolean[m + 1][n + 1]; // @viz init
        dp[0][0] = true; // empty matches empty // @viz init
        for (int j = 2; j <= n; j++) { // @viz empty
            if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 2]; // "a*b*" can match "" // @viz empty
        }
        for (int i = 1; i <= m; i++) { // @viz cell
            for (int j = 1; j <= n; j++) { // @viz cell
                if (p.charAt(j - 1) == '*') { // @viz star
                    boolean zero = dp[i][j - 2]; // "x*" used zero times // @viz star
                    char x = p.charAt(j - 2); // @viz star
                    boolean more = (x == s.charAt(i - 1) || x == '.') && dp[i - 1][j]; // one more x // @viz star
                    dp[i][j] = zero || more; // @viz star
                } else {
                    char c = p.charAt(j - 1); // @viz single
                    dp[i][j] = (c == s.charAt(i - 1) || c == '.') && dp[i - 1][j - 1]; // @viz single
                }
            }
        }
        return dp[m][n]; // @viz return
    }
}
