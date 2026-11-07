import java.util.*;
class Solution {
    public boolean canPartition(int[] nums) {
        int total = 0; // @viz init
        for (int x : nums) total += x; // @viz init
        if (total % 2 != 0) return false; // an odd total can't split into two equal halves // @viz init
        int half = total / 2; // @viz init
        Set<Integer> sums = new HashSet<>(List.of(0)); // every subset sum reachable so far // @viz init
        for (int x : nums) { // @viz add
            List<Integer> more = new ArrayList<>(); // @viz add
            for (int s : sums) if (s + x <= half) more.add(s + x); // each old sum, with x added // @viz add
            sums.addAll(more); // @viz add
            if (sums.contains(half)) return true; // @viz found
        }
        return false; // @viz return
    }
}
