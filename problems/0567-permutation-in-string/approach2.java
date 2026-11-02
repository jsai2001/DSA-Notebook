import java.util.Arrays;
class Solution {
    public boolean checkInclusion(String s1, String s2) {
        int m = s1.length(), n = s2.length(); // @viz init
        if (m > n) return false; // no window is long enough // @viz init
        int[] need = new int[26], have = new int[26]; // letter counts of s1 and of the current window // @viz init
        for (int i = 0; i < m; i++) { // the first window is s2[0..m-1] // @viz init
            need[s1.charAt(i) - 'a']++; // @viz init
            have[s2.charAt(i) - 'a']++; // @viz init
        }
        for (int i = m; i < n; i++) { // @viz slide
            if (Arrays.equals(have, need)) { // same counts: this window is a permutation of s1 // @viz check
                return true; // @viz found
            }
            have[s2.charAt(i) - 'a']++; // slide right: s2[i] comes in // @viz slide
            have[s2.charAt(i - m) - 'a']--; // and s2[i - m] goes out // @viz slide
        }
        return Arrays.equals(have, need); // the last window hasn't been checked yet // @viz return
    }
}
