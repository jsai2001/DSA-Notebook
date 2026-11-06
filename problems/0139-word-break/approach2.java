import java.util.*;

class Solution {
    private String s;
    private List<String> dict;
    private Boolean[] memo; // start -> null unknown, else the answer

    public boolean wordBreak(String s, List<String> wordDict) {
        this.s = s; // @viz init
        this.dict = wordDict; // @viz init
        memo = new Boolean[s.length()]; // @viz init
        return can(0); // @viz init
    }

    private boolean can(int start) {
        if (start == s.length()) return true; // @viz done
        if (memo[start] != null) return memo[start]; // already worked out: don't redo it // @viz memo
        boolean ok = false; // @viz try
        for (String w : dict) { // @viz try
            if (s.startsWith(w, start) && can(start + w.length())) { // @viz try
                ok = true; // @viz found
                break; // @viz found
            }
        }
        memo[start] = ok; // @viz save
        return ok; // @viz save
    }
}
