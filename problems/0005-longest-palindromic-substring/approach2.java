class Solution {
    public String longestPalindrome(String s) {
        int n = s.length(); // @viz init
        boolean[][] dp = new boolean[n][n]; // dp[i][j]: is s[i..j] a palindrome? // @viz init
        int start = 0, best = 1; // @viz init
        for (int length = 1; length <= n; length++) { // @viz cell
            for (int i = 0; i + length <= n; i++) { // @viz cell
                int j = i + length - 1; // @viz cell
                if (s.charAt(i) == s.charAt(j) && (length <= 2 || dp[i + 1][j - 1])) { // @viz check
                    dp[i][j] = true; // @viz mark
                    if (length > best) { // @viz best
                        start = i; // @viz best
                        best = length; // @viz best
                    }
                }
            }
        }
        return s.substring(start, start + best); // @viz return
    }
}
