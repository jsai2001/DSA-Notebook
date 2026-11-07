class Solution {
public:
    int getSum(int a, int b) {
        unsigned x = a, y = b, res = 0, carry = 0; // unsigned: shifts are well defined // @viz init
        for (int i = 0; i < 32; ++i) { // one full adder per bit, lowest first // @viz bit
            unsigned p = x >> i & 1, q = y >> i & 1; // @viz bit
            res |= (p ^ q ^ carry) << i; // the sum bit: odd number of 1s // @viz bit
            carry = (p & q) | (carry & (p ^ q)); // the carry: at least two 1s // @viz bit
        }
        return (int)res; // @viz return
    }
};
