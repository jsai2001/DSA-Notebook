import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        return new ArrayList<>(Arrays.stream(strs)
            .collect(Collectors.groupingBy(s -> { // a map from key to list, built for you
                char[] letters = s.toCharArray();
                Arrays.sort(letters);
                return new String(letters);
            }))
            .values());
    }
}
