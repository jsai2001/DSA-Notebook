import java.util.*;
class Solution {
    private final Random rng = new Random(973);
    public int[][] kClosest(int[][] points, int k) {
        int n = points.length; // @viz init
        int[] d = new int[n], idx = new int[n]; // squared distances, and the order being partitioned // @viz init
        for (int i = 0; i < n; i++) { d[i] = points[i][0] * points[i][0] + points[i][1] * points[i][1]; idx[i] = i; } // @viz init
        int lo = 0, hi = n - 1; // put the k smallest distances in idx[0..k-1], in any order // @viz init
        while (lo < hi) { // @viz part
            int p = lo + rng.nextInt(hi - lo + 1), t = idx[p]; idx[p] = idx[hi]; idx[hi] = t; // random pivot: no bad input can force O(n²) // @viz part
            int pivot = d[idx[hi]], store = lo; // @viz part
            for (int i = lo; i < hi; i++) // move everything closer than the pivot to the left // @viz part
                if (d[idx[i]] < pivot) { t = idx[i]; idx[i] = idx[store]; idx[store++] = t; } // @viz part
            t = idx[store]; idx[store] = idx[hi]; idx[hi] = t; // the pivot lands at its sorted place // @viz part
            if (store == k - 1) break; // @viz keep
            if (store < k - 1) lo = store + 1; // the k-th closest is to the right // @viz keep
            else hi = store - 1; // it's to the left // @viz keep
        }
        int[][] ans = new int[k][]; // @viz return
        for (int i = 0; i < k; i++) ans[i] = points[idx[i]]; // @viz return
        return ans; // @viz return
    }
}
