class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false; // @viz len
        int[] count = new int[26]; // one slot per letter a..z // @viz count
        for (int i = 0; i < s.length(); i++) count[s.charAt(i) - 'a']++; // @viz count
        for (int i = 0; i < t.length(); i++) // @viz use
            if (--count[t.charAt(i) - 'a'] < 0) return false; // t has more of this letter than s // @viz use, short
        return true; // same length and no letter went negative: every count is 0 // @viz return
    }
}
