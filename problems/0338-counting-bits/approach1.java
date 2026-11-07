class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1]; // @viz init
        for (int i = 0; i <= n; i++) { // count each number on its own // @viz num
            int x = i, c = 0; // @viz num
            while (x != 0) { // one round per 1 bit // @viz clear
                x &= x - 1; // clear the lowest 1 // @viz clear
                c++; // @viz clear
            }
            ans[i] = c; // @viz store
        }
        return ans; // @viz return
    }
}
