class Solution {
    private String a, b;
    public int numDistinct(String s, String t) {
        a = s; // @viz answer
        b = t; // @viz answer
        return count(0, 0); // @viz answer
    }
    // Plain int is fine: overflow on the way wraps modulo 2^32, and with only additions the final answer is still exact.
    private int count(int i, int j) { // ways to spell t[j..] using letters of s[i..], in order // @viz call
        if (j == b.length()) return 1; // all of t is spelled: one way // @viz done
        if (a.length() - i < b.length() - j) return 0; // not enough of s left // @viz short
        int ways = count(i + 1, j); // skip s[i] // @viz skip
        if (a.charAt(i) == b.charAt(j)) ways += count(i + 1, j + 1); // or use s[i] for t[j] // @viz use
        return ways; // @viz sum
    }
}
