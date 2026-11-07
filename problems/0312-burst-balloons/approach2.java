import java.util.*;
class Solution {
    private int[] a;
    private int[][] memo;
    public int maxCoins(int[] nums) {
        int n = nums.length; // @viz init
        a = new int[n + 2]; // padding: the ends act like balloons worth 1 that never burst // @viz init
        a[0] = a[n + 1] = 1; // @viz init
        System.arraycopy(nums, 0, a, 1, n); // @viz init
        memo = new int[n + 2][n + 2]; // @viz init
        for (int[] row : memo) Arrays.fill(row, -1); // @viz init
        return best(0, n + 1); // @viz return
    }
    private int best(int lo, int hi) { // the most coins from bursting every balloon strictly between lo and hi // @viz call
        if (lo + 1 == hi) return 0; // nothing in between // @viz base
        if (memo[lo][hi] >= 0) return memo[lo][hi]; // @viz memo
        int m = 0; // @viz memo
        for (int k = lo + 1; k < hi; k++) // pick k, the LAST balloon burst in here: when it goes, lo and hi are its neighbours // @viz last
            m = Math.max(m, best(lo, k) + a[lo] * a[k] * a[hi] + best(k, hi)); // @viz last
        return memo[lo][hi] = m; // @viz memo
    }
}
