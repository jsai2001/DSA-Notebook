import java.util.ArrayList;
import java.util.List;
class Solution {
    public int[][] merge(int[][] intervals) {
        List<int[]> merged = new ArrayList<>(); // disjoint intervals so far, in no particular order // @viz init
        for (int[] in : intervals) { // @viz each
            int start = in[0], end = in[1]; // @viz each
            List<int[]> keep = new ArrayList<>(); // the ones the new interval doesn't touch // @viz each
            for (int[] m : merged) { // @viz check
                if (m[0] <= end && start <= m[1]) { // they overlap (touching counts) // @viz check
                    start = Math.min(start, m[0]); // absorb it // @viz absorb
                    end = Math.max(end, m[1]); // @viz absorb
                } else { // @viz check
                    keep.add(m); // @viz check
                }
            }
            keep.add(new int[] {start, end}); // @viz add
            merged = keep; // @viz add
        }
        merged.sort((a, b) -> Integer.compare(a[0], b[0])); // in order of start, like the other approaches // @viz return
        return merged.toArray(new int[0][]); // @viz return
    }
}
