import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        int[][] everything = Arrays.copyOf(intervals, intervals.length + 1); // add it, then sort by start again // @viz sort
        everything[intervals.length] = newInterval; // @viz sort
        Arrays.sort(everything, (a, b) -> Integer.compare(a[0], b[0])); // @viz sort
        List<int[]> merged = new ArrayList<>(); // @viz sort
        for (int[] in : everything) { // @viz each
            int[] last = merged.isEmpty() ? null : merged.get(merged.size() - 1); // @viz each
            if (last != null && in[0] <= last[1]) { // overlaps (or touches) the last merged one // @viz extend
                last[1] = Math.max(last[1], in[1]); // @viz extend
            } else { // @viz new
                merged.add(new int[] {in[0], in[1]}); // a new array, so the input's arrays aren't changed // @viz new
            }
        }
        return merged.toArray(new int[0][]); // @viz return
    }
}
