class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length(); // @viz init
        // dp[i][j]: edits to turn the first i letters of word1 into the first j letters of word2
        int[][] dp = new int[m + 1][n + 1]; // @viz init
        for (int i = 0; i <= m; i++) dp[i][0] = i; // into "": delete all i letters // @viz base
        for (int j = 0; j <= n; j++) dp[0][j] = j; // from "": insert all j letters // @viz base
        for (int i = 1; i <= m; i++) { // @viz fill
            for (int j = 1; j <= n; j++) { // @viz fill
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) { // same last letter: no edit for it // @viz same
                    dp[i][j] = dp[i - 1][j - 1]; // @viz same
                } else { // @viz edit
                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], // replace // @viz edit
                                   Math.min(dp[i - 1][j], // delete word1's letter // @viz edit
                                            dp[i][j - 1])); // insert word2's letter // @viz edit
                }
            }
        }
        return dp[m][n]; // @viz answer
    }
}
