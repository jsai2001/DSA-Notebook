import java.util.*;

class Solution {
    private String s;
    private final List<List<String>> result = new ArrayList<>();
    private final List<String> path = new ArrayList<>();

    public List<List<String>> partition(String s) {
        this.s = s; // @viz init
        backtrack(0); // @viz init
        return result; // @viz return
    }

    private boolean isPal(int lo, int hi) { // two pointers, every time it's asked // @viz check
        while (lo < hi) { // @viz check
            if (s.charAt(lo++) != s.charAt(hi--)) return false; // @viz check
        }
        return true; // @viz check
    }

    private void backtrack(int start) {
        if (start == s.length()) { // every letter is in some piece // @viz done
            result.add(new ArrayList<>(path)); // a copy: path keeps changing // @viz done
            return; // @viz done
        }
        for (int end = start; end < s.length(); end++) { // next piece = s[start..end] // @viz try
            if (isPal(start, end)) { // @viz try
                path.add(s.substring(start, end + 1)); // choose // @viz choose
                backtrack(end + 1); // explore the rest // @viz choose
                path.remove(path.size() - 1); // undo // @viz undo
            }
        }
    }
}
