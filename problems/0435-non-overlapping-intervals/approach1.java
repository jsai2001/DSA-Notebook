import java.util.*;
class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        int[][] iv = intervals.clone(); // @viz init
        Arrays.sort(iv, (x, y) -> x[0] != y[0] ? Integer.compare(x[0], y[0]) : Integer.compare(x[1], y[1])); // by start // @viz init
        int n = iv.length, best = 0; // @viz init
        int[] keep = new int[n]; // keep[i]: most intervals kept from iv[0..i], ending with iv[i] // @viz init
        for (int i = 0; i < n; i++) { // @viz dp
            keep[i] = 1; // @viz dp
            for (int j = 0; j < i; j++) // @viz dp
                if (iv[j][1] <= iv[i][0]) keep[i] = Math.max(keep[i], keep[j] + 1); // iv[j] ends before iv[i] starts // @viz dp
            best = Math.max(best, keep[i]); // @viz dp
        }
        return n - best; // remove everything else // @viz return
    }
}
