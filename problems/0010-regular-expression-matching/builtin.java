class Solution {
    public boolean isMatch(String s, String p) {
        // p only uses letters, '.' and '*', which mean the same in real regex.
        return s.matches(p); // String.matches must cover the whole string
    }
}
