import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> groups = new ArrayList<>(); // each group: words that are anagrams of each other // @viz init
        for (String s : strs) { // @viz word
            boolean placed = false;
            for (List<String> group : groups) { // compare with one word from each group so far // @viz compare
                if (isAnagram(group.get(0), s)) { // @viz compare
                    group.add(s); // @viz join
                    placed = true; // @viz join
                    break; // @viz join
                }
            }
            if (!placed) groups.add(new ArrayList<>(List.of(s))); // no group matched: s starts a new one // @viz new
        }
        return groups; // @viz return
    }

    private static boolean isAnagram(String a, String b) { // same letters, same number of times
        if (a.length() != b.length()) return false;
        char[] x = a.toCharArray(), y = b.toCharArray();
        Arrays.sort(x);
        Arrays.sort(y);
        return Arrays.equals(x, y);
    }
}
