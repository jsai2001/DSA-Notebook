import java.util.Arrays;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] last = new int[128]; // last index of each ASCII char // @viz init
        Arrays.fill(last, -1); // @viz init
        int left = 0, best = 0; // @viz init
        for (int right = 0; right < s.length(); right++) { // @viz loop
            char c = s.charAt(right); // @viz loop
            if (last[c] >= left) { // @viz check
                left = last[c] + 1; // @viz jump
            }
            last[c] = right; // @viz record
            best = Math.max(best, right - left + 1); // @viz record
        }
        return best; // @viz return
    }
}
