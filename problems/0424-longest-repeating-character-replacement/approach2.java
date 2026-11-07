class Solution {
    public int characterReplacement(String s, int k) {
        int best = 0, n = s.length(); // @viz init
        boolean[] present = new boolean[26]; // @viz init
        for (int i = 0; i < n; i++) present[s.charAt(i) - 'A'] = true; // @viz init
        for (int c = 0; c < 26; c++) { // guess which letter the run is made of // @viz letter
            if (!present[c]) continue; // @viz letter
            int lo = 0, other = 0; // other: letters in the window that aren't c // @viz letter
            for (int hi = 0; hi < n; hi++) { // @viz grow
                if (s.charAt(hi) - 'A' != c) other++; // @viz grow
                while (other > k) if (s.charAt(lo++) - 'A' != c) other--; // too many to change: shrink from the left // @viz shrink
                best = Math.max(best, hi - lo + 1); // @viz best
            }
        }
        return best; // @viz return
    }
}
