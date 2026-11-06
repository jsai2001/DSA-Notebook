import java.util.*;

class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> present = new HashSet<>(); // @viz init
        for (int x : nums) present.add(x); // @viz init
        int best = 0; // @viz init
        for (int x : nums) { // @viz loop
            int length = 1; // @viz start
            while (present.contains(x + length)) { // walk up from every number // @viz walk
                length++; // @viz walk
            }
            best = Math.max(best, length); // @viz best
        }
        return best; // @viz return
    }
}
