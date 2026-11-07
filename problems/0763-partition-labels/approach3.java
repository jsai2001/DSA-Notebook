import java.util.*;
class Solution {
    public List<Integer> partitionLabels(String s) {
        int[] last = new int[26]; // each letter's last index // @viz last
        for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i; // later ones overwrite // @viz last
        List<Integer> res = new ArrayList<>(); // @viz init
        int start = 0, end = 0; // @viz init
        for (int i = 0; i < s.length(); i++) { // @viz scan
            end = Math.max(end, last[s.charAt(i) - 'a']); // this part must reach at least this letter's last copy // @viz scan
            if (i == end) { // every letter so far ends here: cut // @viz cut
                res.add(end - start + 1); // @viz cut
                start = i + 1; // @viz cut
            }
        }
        return res; // @viz return
    }
}
