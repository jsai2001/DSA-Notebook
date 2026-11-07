class Solution {
    private String s;

    public boolean checkValidString(String s) {
        this.s = s; // @viz init
        return ok(0, 0); // @viz init
    }

    private boolean ok(int i, int open) { // can s[i:] finish, with `open` "(" still waiting for a ")"?
        if (open < 0) return false; // a ")" with nothing to close // @viz dead
        if (i == s.length()) return open == 0; // everything closed // @viz end
        char c = s.charAt(i); // @viz try
        if (c == '(') return ok(i + 1, open + 1); // @viz try
        if (c == ')') return ok(i + 1, open - 1); // @viz try
        // "*": try all three meanings
        return ok(i + 1, open + 1) || ok(i + 1, open - 1) || ok(i + 1, open); // @viz star
    }
}
