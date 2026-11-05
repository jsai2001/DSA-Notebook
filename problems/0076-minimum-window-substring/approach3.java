class Solution {
    public String minWindow(String s, String t) {
        int[] need = new int[128]; // how many more of each letter the window needs; below 0 = extra // @viz init
        for (char c : t.toCharArray()) need[c]++; // @viz init
        int missing = t.length(); // letters of t not yet in the window // @viz init
        int m = s.length(); // @viz init
        int bestStart = 0, bestLen = m + 1; // no window yet // @viz init
        int left = 0; // @viz init
        for (int right = 0; right < m; right++) { // @viz grow
            char c = s.charAt(right); // @viz grow
            if (need[c] > 0) missing--; // t still needed this letter // @viz grow
            need[c]--; // @viz grow
            if (missing == 0) { // the window covers t // @viz check
                while (need[s.charAt(left)] < 0) { // s[left] is extra: drop it // @viz shrink
                    need[s.charAt(left)]++; // @viz shrink
                    left++; // @viz shrink
                }
                if (right - left + 1 < bestLen) { // the shortest window ending at right // @viz record
                    bestStart = left; // @viz record
                    bestLen = right - left + 1; // @viz record
                }
                need[s.charAt(left)]++; // give up s[left]: now one letter of t is missing // @viz release
                missing++; // @viz release
                left++; // @viz release
            }
        }
        return bestLen <= m ? s.substring(bestStart, bestStart + bestLen) : ""; // @viz return
    }
}
