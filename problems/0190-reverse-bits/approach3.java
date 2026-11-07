class Solution {
    public int reverseBits(int n) {
        n = (n >>> 16) | (n << 16); // swap the two 16-bit halves // @viz s16
        n = ((n >>> 8) & 0x00FF00FF) | ((n & 0x00FF00FF) << 8); // swap the bytes in each half // @viz s8
        n = ((n >>> 4) & 0x0F0F0F0F) | ((n & 0x0F0F0F0F) << 4); // swap the 4-bit pieces in each byte // @viz s4
        n = ((n >>> 2) & 0x33333333) | ((n & 0x33333333) << 2); // swap the pairs // @viz s2
        n = ((n >>> 1) & 0x55555555) | ((n & 0x55555555) << 1); // swap neighbouring bits // @viz s1
        return n; // @viz return
    }
}
