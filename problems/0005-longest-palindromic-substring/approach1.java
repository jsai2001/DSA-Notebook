class Solution {
    private boolean isPalin(String s, int start, int len) {
        for (int a = start, b = start + len - 1; a < b; a++, b--) {
            if (s.charAt(a) != s.charAt(b)) return false;
        }
        return true;
    }

    public String longestPalindrome(String s) {
        int n = s.length(); // @viz init
        int bestStart = 0, bestLen = 1; // @viz init
        for (int len = 1; len <= n; len++) { // @viz length, next
            for (int start = 0; start + len <= n; start++) { // @viz check
                if (isPalin(s, start, len)) { // @viz check
                    bestStart = start; // @viz found
                    bestLen = len; // @viz found
                    break; // @viz found
                }
            }
        }
        return s.substring(bestStart, bestStart + bestLen); // @viz return
    }
}
