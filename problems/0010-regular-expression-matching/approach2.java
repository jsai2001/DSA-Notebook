class Solution {
    private Boolean[][] memo; // memo[i][j]: does s[i..] match p[j..]? null = not solved yet
    private String s, p;

    public boolean isMatch(String s, String p) {
        this.s = s; // @viz init
        this.p = p; // @viz init
        memo = new Boolean[s.length() + 1][p.length() + 1]; // @viz init
        return match(0, 0); // @viz return
    }

    private boolean match(int i, int j) { // @viz call
        if (memo[i][j] != null) return memo[i][j]; // @viz hit
        boolean ans;
        if (j == p.length()) { // @viz end
            ans = i == s.length(); // @viz end
        } else {
            boolean first = i < s.length() && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.'); // @viz first
            if (j + 1 < p.length() && p.charAt(j + 1) == '*') { // @viz star
                ans = match(i, j + 2) || (first && match(i + 1, j)); // @viz star
            } else {
                ans = first && match(i + 1, j + 1); // @viz single
            }
        }
        memo[i][j] = ans; // @viz store
        return ans; // @viz store
    }
}
