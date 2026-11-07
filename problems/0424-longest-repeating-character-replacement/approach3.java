class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26]; // letters in the window // @viz init
        int lo = 0, top = 0, n = s.length(); // top: the biggest count any letter has reached in a window // @viz init
        for (int hi = 0; hi < n; hi++) { // @viz grow
            top = Math.max(top, ++count[s.charAt(hi) - 'A']); // @viz grow
            if (hi - lo + 1 - top > k) count[s.charAt(lo++) - 'A']--; // too many to change: slide the window instead of growing it // @viz slide
        }
        return n - lo; // the window never shrinks, so its final size is the best size // @viz return
    }
}
