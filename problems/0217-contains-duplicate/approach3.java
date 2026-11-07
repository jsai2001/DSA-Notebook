import java.util.*;
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>(nums.length * 2); // values met so far // @viz init
        for (int x : nums) { // @viz loop
            if (!seen.add(x)) return true; // add fails if x is already there: a duplicate // @viz found, add
        }
        return false; // @viz none
    }
}
