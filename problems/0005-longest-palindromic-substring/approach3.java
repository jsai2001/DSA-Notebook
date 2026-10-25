class Solution {
    private int start, best;

    public String longestPalindrome(String s) {
        start = 0; // @viz init
        best = 1; // @viz init
        for (int center = 0; center < s.length(); center++) { // @viz center
            expand(s, center, center);      // odd length // @viz center
            expand(s, center, center + 1);  // even length // @viz center
        }
        return s.substring(start, start + best); // @viz return
    }

    private void expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) { // @viz step
            left--; // @viz step
            right++; // @viz step
        }
        if (right - left - 1 > best) { // @viz record
            best = right - left - 1; // @viz record
            start = left + 1; // @viz record
        }
    }
}
