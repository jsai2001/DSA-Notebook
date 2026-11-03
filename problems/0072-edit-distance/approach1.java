import java.util.Arrays;
class Solution {
    private String a, b;
    private int[][] memo;
    public int minDistance(String word1, String word2) {
        a = word1; // @viz init
        b = word2; // @viz init
        memo = new int[a.length()][b.length()]; // memo[i][j]: edits to turn a[i..] into b[j..]; -1 = not known // @viz init
        for (int[] row : memo) Arrays.fill(row, -1); // @viz init
        return dist(0, 0); // @viz answer
    }
    private int dist(int i, int j) { // @viz call
        int m = a.length(), n = b.length(); // @viz call
        if (i == m) return n - j; // word1 is used up: insert the rest of word2 // @viz edge
        if (j == n) return m - i; // word2 is used up: delete the rest of word1 // @viz edge
        if (memo[i][j] == -1) { // @viz memo
            if (a.charAt(i) == b.charAt(j)) { // same letter: keep it, no edit // @viz same
                memo[i][j] = dist(i + 1, j + 1); // @viz same
            } else { // @viz edit
                memo[i][j] = 1 + Math.min(dist(i + 1, j + 1), // replace a[i] with b[j] // @viz edit
                                 Math.min(dist(i + 1, j), // delete a[i] // @viz edit
                                          dist(i, j + 1))); // insert b[j] // @viz edit
            }
        }
        return memo[i][j]; // @viz memo
    }
}
