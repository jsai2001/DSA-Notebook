import java.util.*;
class Solution {
    private int[] nxt; // nxt[i] leads to the first unanswered point at or after i
    private int find(int i) { // follow nxt, shortening the path as we go // @viz init
        int root = i; // @viz init
        while (nxt[root] != root) root = nxt[root]; // @viz init
        while (nxt[i] != root) { int up = nxt[i]; nxt[i] = root; i = up; } // @viz init
        return root; // @viz init
    }
    public int[] minInterval(int[][] intervals, int[] queries) {
        int[] qs = Arrays.stream(queries).sorted().distinct().toArray(); // the different query points, in order // @viz init
        int m = qs.length; // @viz init
        int[] size = new int[m]; // answer for each point // @viz init
        Arrays.fill(size, -1); // @viz init
        nxt = new int[m + 1]; // @viz init
        for (int i = 0; i <= m; i++) nxt[i] = i; // @viz init
        int[][] iv = intervals.clone(); // @viz interval
        Arrays.sort(iv, (x, y) -> Integer.compare(x[1] - x[0], y[1] - y[0])); // smallest interval first // @viz interval
        for (int[] v : iv) { // @viz interval
            int p = Arrays.binarySearch(qs, v[0]); // @viz interval
            int i = find(p >= 0 ? p : -p - 1); // first unanswered point inside // @viz interval
            while (i < m && qs[i] <= v[1]) { // every unanswered point it covers: this is their smallest // @viz fill
                size[i] = v[1] - v[0] + 1; // @viz fill
                nxt[i] = i + 1; // answered: skip it from now on // @viz fill
                i = find(i + 1); // @viz fill
            }
        }
        int[] ans = new int[queries.length]; // @viz return
        for (int k = 0; k < queries.length; k++) ans[k] = size[Arrays.binarySearch(qs, queries[k])]; // @viz return
        return ans; // @viz return
    }
}
