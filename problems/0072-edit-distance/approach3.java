class Solution {
    public int minDistance(String word1, String word2) {
        if (word1.length() < word2.length()) { // the distance is the same both ways; keep the row short // @viz init
            String t = word1; // @viz init
            word1 = word2; // @viz init
            word2 = t; // @viz init
        }
        int n = word2.length(); // @viz init
        int[] row = new int[n + 1]; // @viz init
        for (int j = 0; j <= n; j++) row[j] = j; // row[j] = dp[0][j] = j: build word2[:j] from "" // @viz init
        for (int i = 1; i <= word1.length(); i++) { // turn row into dp[i][...] // @viz row
            int diag = row[0]; // dp[i - 1][j - 1], saved before it's overwritten // @viz row
            row[0] = i; // dp[i][0] = i // @viz row
            for (int j = 1; j <= n; j++) { // @viz cell
                int above = row[j]; // still dp[i - 1][j] // @viz cell
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) row[j] = diag; // @viz cell
                else row[j] = 1 + Math.min(diag, Math.min(above, row[j - 1])); // row[j - 1] is already dp[i][j - 1] // @viz cell
                diag = above; // the next cell's diagonal // @viz cell
            }
        }
        return row[n]; // @viz answer
    }
}
