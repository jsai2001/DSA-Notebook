class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length; // @viz init
        int[] ans = new int[n]; // @viz init
        for (int i = n - 2; i >= 0; i--) { // right to left: the days after i are already solved // @viz day
            int j = i + 1; // @viz look
            while (j < n && temperatures[j] <= temperatures[i]) // day j isn't warmer... // @viz jump
                j = ans[j] != 0 ? j + ans[j] : n; // ...so jump straight to day j's own warmer day (or give up) // @viz jump
            if (j < n) ans[i] = j - i; // @viz found
        }
        return ans; // @viz return
    }
}
