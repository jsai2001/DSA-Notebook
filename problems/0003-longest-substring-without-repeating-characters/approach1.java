import java.util.HashSet;
import java.util.Set;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length();
        if (n == 0) return 0; // @viz empty
        int[][] tracker = new int[n][n]; // @viz init
        int maxSubLen = 1; // @viz init
        for (int j = 0; j < n; j++) { // @viz outer
            Set<Character> seen = new HashSet<>(); // @viz outer
            for (int i = j; i < n; i++) {
                char c = s.charAt(i); // @viz extend, repeat
                if (seen.contains(c)) break; // @viz extend, repeat
                tracker[i][j] = (i > 0 ? tracker[i - 1][j] + 1 : 1); // @viz extend
                maxSubLen = Math.max(maxSubLen, tracker[i][j]); // @viz extend
                seen.add(c); // @viz extend
            }
        }
        return maxSubLen; // @viz return
    }
}
