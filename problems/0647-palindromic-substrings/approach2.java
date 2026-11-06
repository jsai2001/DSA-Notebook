class Solution {
    public int countSubstrings(String s) {
        int n = s.length(); // @viz init
        boolean[][] pal = new boolean[n][n]; // pal[i][j]: is s[i..j] a palindrome? // @viz init
        int count = 0; // @viz init
        for (int i = n - 1; i >= 0; i--) { // i from the end, so pal[i + 1] is ready // @viz row
            for (int j = i; j < n; j++) { // @viz cell
                // Same ends, and the inside s[i+1..j-1] is a palindrome (or has 0-1 letters).
                if (s.charAt(i) == s.charAt(j) && (j - i < 2 || pal[i + 1][j - 1])) { // @viz cell
                    pal[i][j] = true; // @viz count
                    count++; // @viz count
                }
            }
        }
        return count; // @viz return
    }
}
