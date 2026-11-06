class Solution {
    public int countSubstrings(String s) {
        int n = s.length(); // @viz init
        int count = 0; // @viz init
        for (int i = 0; i < n; i++) { // @viz pick
            for (int j = i; j < n; j++) { // every substring s[i..j] // @viz pick
                int lo = i, hi = j; // @viz check
                while (lo < hi && s.charAt(lo) == s.charAt(hi)) { // two pointers moving inward // @viz check
                    lo++; // @viz check
                    hi--; // @viz check
                }
                if (lo >= hi) count++; // the pointers met: it's a palindrome // @viz count
            }
        }
        return count; // @viz return
    }
}
