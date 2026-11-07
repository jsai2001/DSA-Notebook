import java.util.*;
class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (x, y) -> Integer.compare(x[0], y[0])); // by start // @viz init
        int removed = 0, end = intervals[0][1]; // end of the last interval kept // @viz init
        for (int i = 1; i < intervals.length; i++) { // @viz scan
            if (intervals[i][0] >= end) end = intervals[i][1]; // no overlap: keep it // @viz keep
            else { // overlap: one of the two must go; drop the one that ends later // @viz drop
                removed++; // @viz drop
                end = Math.min(end, intervals[i][1]); // @viz drop
            }
        }
        return removed; // @viz return
    }
}
