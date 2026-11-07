import java.util.*;
class Solution {
    private String a, b;
    private int[][] memo;
    public int longestCommonSubsequence(String text1, String text2) {
        a = text1; // @viz init
        b = text2; // @viz init
        memo = new int[a.length()][b.length()]; // remember lcs(i, j) for each pair (-1 = not yet) // @viz init
        for (int[] row : memo) Arrays.fill(row, -1); // @viz init
        return lcs(0, 0); // @viz return
    }
    private int lcs(int i, int j) { // LCS of a[i:] and b[j:] // @viz call
        if (i == a.length() || j == b.length()) return 0; // one of them is used up // @viz base
        if (memo[i][j] >= 0) return memo[i][j]; // @viz call
        if (a.charAt(i) == b.charAt(j)) return memo[i][j] = 1 + lcs(i + 1, j + 1); // same letter: take it, move on in both // @viz same
        return memo[i][j] = Math.max(lcs(i + 1, j), lcs(i, j + 1)); // different: drop one letter from either side // @viz diff
    }
}
