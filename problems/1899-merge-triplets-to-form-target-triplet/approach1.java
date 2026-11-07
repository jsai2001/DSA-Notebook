import java.util.*;
class Solution {
    public boolean mergeTriplets(int[][] triplets, int[] target) {
        Set<List<Integer>> seen = new HashSet<>(); // every triplet you can make by merging some of them // @viz init
        List<Integer> want = List.of(target[0], target[1], target[2]); // @viz init
        for (int[] t : triplets) { // @viz add
            Set<List<Integer>> next = new HashSet<>(seen); // @viz add
            next.add(List.of(t[0], t[1], t[2])); // use t alone // @viz add
            for (List<Integer> s : seen) next.add(List.of(Math.max(s.get(0), t[0]), Math.max(s.get(1), t[1]), Math.max(s.get(2), t[2]))); // or merge it into one so far // @viz add
            seen = next; // @viz add
            if (seen.contains(want)) return true; // @viz found
        }
        return false; // @viz return
    }
}
