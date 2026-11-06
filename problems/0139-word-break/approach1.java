import java.util.*;

class Solution {
    private String s;
    private List<String> dict;

    public boolean wordBreak(String s, List<String> wordDict) {
        this.s = s; // @viz init
        this.dict = wordDict; // @viz init
        return can(0); // @viz init
    }

    private boolean can(int start) { // can s[start:] be split into words?
        if (start == s.length()) return true; // nothing left: the split worked // @viz done
        for (String w : dict) { // @viz try
            if (s.startsWith(w, start) && can(start + w.length())) { // w fits here, and the rest splits // @viz try
                return true; // @viz found
            }
        }
        return false; // no word works from here // @viz fail
    }
}
