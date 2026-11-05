class Solution {
    public String minWindow(String s, String t) {
        int[] need = new int[128]; // @viz init
        for (char c : t.toCharArray()) need[c]++; // @viz init
        int m = s.length(), n = t.length(); // @viz init
        int bestStart = 0, bestLen = m + 1; // no window yet // @viz init
        for (int i = 0; i < m; i++) { // @viz start
            int[] have = new int[128]; // @viz start
            int missing = n; // letters of t not yet in s[i..j] // @viz start
            for (int j = i; j < m; j++) { // @viz grow
                char c = s.charAt(j); // @viz grow
                if (++have[c] <= need[c]) missing--; // one more letter of t is covered // @viz grow
                if (missing == 0) { // s[i..j] covers t // @viz found
                    if (j - i + 1 < bestLen) { // @viz record
                        bestStart = i; // @viz record
                        bestLen = j - i + 1; // @viz record
                    }
                    break; // a longer window from i can't be shorter // @viz found
                }
            }
        }
        return bestLen <= m ? s.substring(bestStart, bestStart + bestLen) : ""; // @viz return
    }
}
