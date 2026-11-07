class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        if (text2.length() > text1.length()) { String t = text1; text1 = text2; text2 = t; } // keep the shorter text as the row // @viz init
        int n = text2.length(); // @viz init
        int[] prev = new int[n + 1], cur = new int[n + 1]; // two rows of the table // @viz init
        for (int i = 0; i < text1.length(); i++) { // @viz row
            char a = text1.charAt(i); // @viz row
            for (int j = 1; j <= n; j++) // @viz cell
                cur[j] = a == text2.charAt(j - 1) ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]); // diagonal + 1, or the best of up and left // @viz same, diff
            int[] t = prev; prev = cur; cur = t; // only one row is ever needed // @viz row
        }
        return prev[n]; // @viz return
    }
}
