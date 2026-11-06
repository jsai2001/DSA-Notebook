class Solution {
    private String a, b, c;
    public boolean isInterleave(String s1, String s2, String s3) {
        if (s1.length() + s2.length() != s3.length()) return false; // the letters have to add up // @viz len
        a = s1; // @viz answer
        b = s2; // @viz answer
        c = s3; // @viz answer
        return can(0, 0); // @viz answer
    }
    private boolean can(int i, int j) { // can s3[i+j..] be made from s1[i..] and s2[j..]? // @viz call
        if (i == a.length() && j == b.length()) return true; // everything used: done // @viz base
        int k = i + j; // the next letter of s3 // @viz call
        if (i < a.length() && a.charAt(i) == c.charAt(k) && can(i + 1, j)) return true; // take it from s1 // @viz take1
        if (j < b.length() && b.charAt(j) == c.charAt(k) && can(i, j + 1)) return true; // or from s2 // @viz take2
        return false; // @viz fail
    }
}
