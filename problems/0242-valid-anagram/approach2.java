import java.util.*;
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false; // @viz len
        Map<Character, Integer> count = new HashMap<>(); // letter -> (times in s) - (times in t) // @viz count
        for (int i = 0; i < s.length(); i++) { // @viz count
            count.merge(s.charAt(i), 1, Integer::sum); // @viz count
            count.merge(t.charAt(i), -1, Integer::sum); // @viz count
        }
        for (int v : count.values()) // @viz check
            if (v != 0) return false; // @viz check
        return true; // every letter evens out // @viz check
    }
}
