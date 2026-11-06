import java.util.*;

class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> present = new HashSet<>(); // @viz init
        for (int x : nums) present.add(x); // @viz init
        int best = 0; // @viz init
        for (int x : present) { // the set, so a repeated start is walked only once // @viz loop
            if (present.contains(x - 1)) { // not the start of a run: its start will cover it // @viz skip
                continue; // @viz skip
            }
            int length = 1; // @viz start
            while (present.contains(x + length)) { // @viz walk
                length++; // @viz walk
            }
            best = Math.max(best, length); // @viz best
        }
        return best; // @viz return
    }
}
