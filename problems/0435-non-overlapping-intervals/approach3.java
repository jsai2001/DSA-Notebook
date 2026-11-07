import java.util.*;
class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (x, y) -> Integer.compare(x[1], y[1])); // by end // @viz init
        int kept = 0; // @viz init
        long end = Long.MIN_VALUE; // end of the last interval kept // @viz init
        for (int[] iv : intervals) { // @viz scan
            if (iv[0] >= end) { // it fits after the last one kept: keep it; it ends the earliest of what's left // @viz keep
                kept++; // @viz keep
                end = iv[1]; // @viz keep
            }
        }
        return intervals.length - kept; // @viz return
    }
}
