class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1]; // ans[0] = 0 // @viz init
        for (int i = 1; i <= n; i++) // @viz num
            ans[i] = ans[i & (i - 1)] + 1; // i with its lowest 1 cleared is smaller and already known // @viz store
        return ans; // @viz return
    }
}
