import java.util.*;
class Solution {
    public boolean isAnagram(String s, String t) {
        char[] a = s.toCharArray(), b = t.toCharArray(); // @viz sort
        Arrays.sort(a); // anagrams have the same letters, so the same sorted order // @viz sort
        Arrays.sort(b); // @viz sort
        return Arrays.equals(a, b); // @viz sort
    }
}
