class Solution {
    public int characterReplacement(String s, int k) {
        int best = 0, n = s.length(); // @viz init
        for (int i = 0; i < n; i++) { // every start // @viz start
            int[] count = new int[26]; // @viz start
            int top = 0; // count of the most common letter in s[i..j] // @viz start
            for (int j = i; j < n; j++) { // every end // @viz grow
                top = Math.max(top, ++count[s.charAt(j) - 'A']); // @viz grow
                if (j - i + 1 - top > k) break; // more than k letters to change: longer ends won't work either // @viz stop
                best = Math.max(best, j - i + 1); // @viz best
            }
        }
        return best; // @viz return
    }
}
