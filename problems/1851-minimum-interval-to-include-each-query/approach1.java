class Solution {
    public int[] minInterval(int[][] intervals, int[] queries) {
        int[] ans = new int[queries.length]; // @viz init
        for (int k = 0; k < queries.length; k++) { // @viz query
            int q = queries[k], best = -1; // @viz query
            for (int[] iv : intervals) // check every interval // @viz check
                if (iv[0] <= q && q <= iv[1] && (best == -1 || iv[1] - iv[0] + 1 < best)) best = iv[1] - iv[0] + 1; // contains q and is smaller // @viz check
            ans[k] = best; // @viz answer
        }
        return ans; // @viz return
    }
}
