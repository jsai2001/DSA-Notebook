import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>(); // letter counts -> the words that have them // @viz init
        for (String s : strs) { // @viz word
            char[] count = new char[26]; // how many a's, b's, ..., z's (at most 100, so a char holds it) // @viz count
            for (char ch : s.toCharArray()) count[ch - 'a']++; // @viz count
            String key = new String(count); // one char per letter: no separator needed // @viz key
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s); // @viz add
        }
        return new ArrayList<>(groups.values()); // @viz return
    }
}
