class Solution {
    public int reverseBits(int n) {
        int res = 0; // @viz init
        for (int i = 0; i < 32; i++) { // all 32 bits, even after n becomes 0 // @viz loop
            res = (res << 1) | (n & 1); // n's lowest bit goes onto res's right end // @viz move
            n >>>= 1; // >>> fills with 0, unlike >> // @viz move
        }
        return res; // @viz return
    }
}
