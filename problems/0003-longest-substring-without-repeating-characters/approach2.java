import java.util.HashSet;
import java.util.Set;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> window = new HashSet<>(); // @viz init
        int left = 0, best = 0; // @viz init
        for (int right = 0; right < s.length(); right++) { // @viz loop
            char c = s.charAt(right); // @viz loop
            while (window.contains(c)) { // @viz dup
                window.remove(s.charAt(left)); // @viz shrink
                left++; // @viz shrink
            }
            window.add(c); // @viz add
            best = Math.max(best, right - left + 1); // @viz add
        }
        return best; // @viz return
    }
}
