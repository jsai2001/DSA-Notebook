import java.util.ArrayList;
import java.util.List;

class Solution {
    public String minWindow(String s, String t) {
        int[] need = new int[128], have = new int[128]; // @viz init
        List<Character> letters = new ArrayList<>(); // the distinct letters of t // @viz init
        for (char c : t.toCharArray()) // @viz init
            if (need[c]++ == 0) letters.add(c); // @viz init
        int m = s.length(); // @viz init
        int bestStart = 0, bestLen = m + 1; // no window yet // @viz init
        int left = 0; // @viz init
        for (int right = 0; right < m; right++) { // @viz grow
            have[s.charAt(right)]++; // @viz grow
            while (covers(need, have, letters)) { // @viz check
                if (right - left + 1 < bestLen) { // @viz record
                    bestStart = left; // @viz record
                    bestLen = right - left + 1; // @viz record
                }
                have[s.charAt(left)]--; // drop the leftmost letter and try again // @viz shrink
                left++; // @viz shrink
            }
        }
        return bestLen <= m ? s.substring(bestStart, bestStart + bestLen) : ""; // @viz return
    }

    // Does the window cover t? Look at every distinct letter of t.
    private boolean covers(int[] need, int[] have, List<Character> letters) {
        for (char c : letters)
            if (have[c] < need[c]) return false;
        return true;
    }
}
