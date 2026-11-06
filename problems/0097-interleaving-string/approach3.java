class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int m = s1.length(), n = s2.length(); // @viz init
        if (m + n != s3.length()) return false; // the letters have to add up // @viz len
        boolean[] dp = new boolean[n + 1]; // one row of the table; dp[j] is row i once row i is done // @viz init
        for (int i = 0; i <= m; i++) { // @viz loop
            for (int j = 0; j <= n; j++) { // @viz loop
                if (i == 0 && j == 0) { // @viz init
                    dp[j] = true; // @viz init
                    continue; // @viz init
                }
                boolean from1 = i > 0 && dp[j] && s1.charAt(i - 1) == s3.charAt(i + j - 1); // dp[j] still holds the row above // @viz from1
                boolean from2 = j > 0 && dp[j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1); // dp[j - 1] is already this row // @viz from2
                dp[j] = from1 || from2; // @viz store
            }
        }
        return dp[n]; // @viz answer
    }
}
