import java.util.*;

class Solution {
    private String s;
    private boolean[][] pal;
    private final List<List<String>> result = new ArrayList<>();
    private final List<String> path = new ArrayList<>();

    public List<List<String>> partition(String s) {
        this.s = s; // @viz table
        int n = s.length(); // @viz table
        // pal[i][j]: is s[i..j] a palindrome? Built from short pieces to long ones.
        pal = new boolean[n][n]; // @viz table
        for (int i = n - 1; i >= 0; i--) { // @viz table
            for (int j = i; j < n; j++) { // @viz table
                pal[i][j] = s.charAt(i) == s.charAt(j) && (j - i < 2 || pal[i + 1][j - 1]); // @viz table
            }
        }
        backtrack(0); // @viz init
        return result; // @viz return
    }

    private void backtrack(int start) {
        int n = s.length();
        if (start == n) { // @viz done
            result.add(new ArrayList<>(path)); // a copy: path keeps changing // @viz done
            return; // @viz done
        }
        for (int end = start; end < n; end++) { // @viz try
            if (pal[start][end]) { // O(1): look it up // @viz try
                path.add(s.substring(start, end + 1)); // choose // @viz choose
                backtrack(end + 1); // explore the rest // @viz choose
                path.remove(path.size() - 1); // undo // @viz undo
            }
        }
    }
}
