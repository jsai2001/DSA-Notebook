class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        int start = newInterval[0], end = newInterval[1]; // @viz init
        int lo = 0, hi = intervals.length; // find left: the first interval that ends at or after start // @viz left
        while (lo < hi) { // @viz left
            int mid = (lo + hi) >>> 1; // @viz left
            if (intervals[mid][1] < start) lo = mid + 1; // @viz left
            else hi = mid; // @viz left
        }
        int left = lo; // @viz left
        hi = intervals.length; // find right: the first interval that starts after end (it's at or after left) // @viz right
        while (lo < hi) { // @viz right
            int mid = (lo + hi) >>> 1; // @viz right
            if (intervals[mid][0] <= end) lo = mid + 1; // @viz right
            else hi = mid; // @viz right
        }
        int right = lo; // intervals[left..right-1] are exactly the ones that overlap // @viz right
        if (left < right) { // @viz merge
            start = Math.min(start, intervals[left][0]); // only the first and last of them matter // @viz merge
            end = Math.max(end, intervals[right - 1][1]); // @viz merge
        }
        int[][] result = new int[left + 1 + intervals.length - right][]; // @viz build
        for (int k = 0; k < left; k++) result[k] = intervals[k].clone(); // @viz build
        result[left] = new int[] {start, end}; // @viz build
        for (int k = right; k < intervals.length; k++) result[left + 1 + k - right] = intervals[k].clone(); // @viz build
        return result; // @viz build
    }
}
