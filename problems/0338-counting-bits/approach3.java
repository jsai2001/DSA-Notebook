class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1]; // ans[0] = 0 // @viz init
        for (int i = 1; i <= n; i++) // @viz num
            ans[i] = ans[i >> 1] + (i & 1); // i without its last bit, plus that last bit // @viz store
        return ans; // @viz return
    }
}
