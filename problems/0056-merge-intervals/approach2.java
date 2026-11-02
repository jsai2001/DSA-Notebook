import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    public int[][] merge(int[][] intervals) {
        int[][] sorted = intervals.clone(); // a copy, so the caller's order is kept // @viz sort
        Arrays.sort(sorted, (a, b) -> Integer.compare(a[0], b[0])); // by start // @viz sort
        List<int[]> merged = new ArrayList<>(); // @viz sort
        for (int[] in : sorted) { // @viz each
            int[] last = merged.isEmpty() ? null : merged.get(merged.size() - 1); // @viz each
            if (last != null && in[0] <= last[1]) { // overlaps (or touches) the last merged one // @viz extend
                last[1] = Math.max(last[1], in[1]); // max: it may sit entirely inside // @viz extend
            } else { // @viz new
                merged.add(new int[] {in[0], in[1]}); // a new array: adding `in` itself would let last[1] = ... change the input // @viz new
            }
        }
        return merged.toArray(new int[0][]); // @viz return
    }
}
