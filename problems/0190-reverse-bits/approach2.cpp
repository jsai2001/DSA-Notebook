class Solution {
public:
    int reverseBits(int n) {
        unsigned x = n, res = 0; // unsigned: shifts never touch a sign bit // @viz init
        for (int i = 0; i < 32; ++i) { // all 32 bits, even after x becomes 0 // @viz loop
            res = (res << 1) | (x & 1); // x's lowest bit goes onto res's right end // @viz move
            x >>= 1; // @viz move
        }
        return (int)res; // @viz return
    }
};
