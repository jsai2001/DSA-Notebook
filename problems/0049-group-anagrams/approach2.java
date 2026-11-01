import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>(); // sorted letters -> the words that have them // @viz init
        for (String s : strs) { // @viz word
            char[] letters = s.toCharArray(); // @viz key
            Arrays.sort(letters); // anagrams sort to the same string: "eat", "tea" -> "aet" // @viz key
            String key = new String(letters); // @viz key
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s); // @viz add
        }
        return new ArrayList<>(groups.values()); // @viz return
    }
}
