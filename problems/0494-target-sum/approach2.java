class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        final int OFF = 1000; // totals run from -1000 to 1000: shift them to 0..2000 // @viz init
        int[] count = new int[2 * OFF + 1]; // count[total + OFF]: sign choices that reach total // @viz init
        count[OFF] = 1; // @viz init
        for (int x : nums) { // @viz step
            int[] nxt = new int[2 * OFF + 1]; // @viz step
            for (int t = 0; t <= 2 * OFF; t++) { // @viz step
                if (count[t] == 0) continue; // @viz step
                if (t + x <= 2 * OFF) nxt[t + x] += count[t]; // total + x // @viz step
                if (t - x >= 0) nxt[t - x] += count[t]; // total - x // @viz step
            }
            count = nxt; // @viz step
        }
        return target + OFF >= 0 && target + OFF <= 2 * OFF ? count[target + OFF] : 0; // @viz return
    }
}
