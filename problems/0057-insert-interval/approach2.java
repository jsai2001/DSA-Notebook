import java.util.ArrayList;
import java.util.List;
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        int start = newInterval[0], end = newInterval[1]; // @viz init
        List<int[]> result = new ArrayList<>(); // @viz init
        int i = 0, n = intervals.length; // @viz init
        while (i < n && intervals[i][1] < start) { // ends before the new one starts: keep it as it is // @viz before
            result.add(intervals[i].clone()); // @viz before
            i++; // @viz before
        }
        while (i < n && intervals[i][0] <= end) { // starts before the new one ends: they overlap, so absorb it // @viz overlap
            start = Math.min(start, intervals[i][0]); // @viz overlap
            end = Math.max(end, intervals[i][1]); // @viz overlap
            i++; // @viz overlap
        }
        result.add(new int[] {start, end}); // the new interval, grown to cover everything it touched // @viz place
        while (i < n) { // the rest start after it ends // @viz after
            result.add(intervals[i].clone()); // @viz after
            i++; // @viz after
        }
        return result.toArray(new int[0][]); // @viz return
    }
}
