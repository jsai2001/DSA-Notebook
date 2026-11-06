import java.util.*;

class Solution {
    public List<List<String>> partition(String s) {
        int n = s.length(); // @viz table
        boolean[][] pal = new boolean[n][n]; // @viz table
        for (int i = n - 1; i >= 0; i--) { // @viz table
            for (int j = i; j < n; j++) { // @viz table
                pal[i][j] = s.charAt(i) == s.charAt(j) && (j - i < 2 || pal[i + 1][j - 1]); // @viz table
            }
        }
        // parts.get(i) = every way to split the suffix s[i:]. parts.get(n) has one way: no pieces.
        List<List<List<String>>> parts = new ArrayList<>(); // @viz init
        for (int i = 0; i <= n; i++) parts.add(new ArrayList<>()); // @viz init
        parts.get(n).add(new ArrayList<>()); // @viz init
        for (int i = n - 1; i >= 0; i--) { // shortest suffix first // @viz suffix
            for (int end = i; end < n; end++) { // first piece = s[i..end] // @viz try
                if (!pal[i][end]) continue; // @viz try
                String piece = s.substring(i, end + 1); // @viz join
                for (List<String> rest : parts.get(end + 1)) { // every way to split what's left // @viz join
                    List<String> split = new ArrayList<>(rest.size() + 1); // @viz join
                    split.add(piece); // @viz join
                    split.addAll(rest); // @viz join
                    parts.get(i).add(split); // @viz join
                }
            }
        }
        return parts.get(0); // @viz return
    }
}
