import java.util.*;

class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        int n = s.length(); // @viz init
        Set<String> words = new HashSet<>(wordDict); // @viz init
        TreeSet<Integer> lengths = new TreeSet<>(); // at most 20 different lengths, in order // @viz init
        for (String w : wordDict) lengths.add(w.length()); // @viz init
        boolean[] dp = new boolean[n + 1]; // dp[i]: can the first i letters be split? // @viz init
        dp[0] = true; // the empty prefix: zero words // @viz init
        for (int i = 1; i <= n; i++) { // @viz end
            for (int L : lengths) { // the last word is s[i-L:i] // @viz try
                if (L > i) break; // @viz try
                if (dp[i - L] && words.contains(s.substring(i - L, i))) { // @viz hit
                    dp[i] = true; // @viz hit
                    break; // @viz hit
                }
            }
        }
        return dp[n]; // @viz return
    }
}
