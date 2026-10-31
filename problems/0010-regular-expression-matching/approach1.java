class Solution {
    public boolean isMatch(String s, String p) {
        return match(s, p, 0, 0); // @viz start
    }

    // does s[i..] match p[j..]?
    private boolean match(String s, String p, int i, int j) { // @viz call
        if (j == p.length()) return i == s.length(); // @viz end
        boolean first = i < s.length() && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.'); // @viz first
        if (j + 1 < p.length() && p.charAt(j + 1) == '*') { // @viz star
            // skip "x*" (zero copies), or use one copy and stay on "x*"
            return match(s, p, i, j + 2) || (first && match(s, p, i + 1, j)); // @viz star
        }
        return first && match(s, p, i + 1, j + 1); // @viz single
    }
}
