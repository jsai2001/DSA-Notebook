import java.util.HashSet;
import java.util.Set;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length();
        if (n == 0) return 0;
        int[][] tracker = new int[n][n];
        int maxSubLen = 1;
        for (int j = 0; j < n; j++) {
            Set<Character> seen = new HashSet<>();
            for (int i = j; i < n; i++) {
                char c = s.charAt(i);
                if (seen.contains(c)) break;
                tracker[i][j] = (i > 0 ? tracker[i - 1][j] + 1 : 1);
                maxSubLen = Math.max(maxSubLen, tracker[i][j]);
                seen.add(c);
            }
        }
        return maxSubLen;
    }
}
