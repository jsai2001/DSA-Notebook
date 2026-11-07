class Solution {
public:
    int getSum(int a, int b) {
        unsigned x = a, y = b; // unsigned: shifting a carry out of bit 31 is well defined // @viz init
        while (y) { // until no carry is left // @viz loop
            unsigned carry = (x & y) << 1; // the carries, one place up // @viz step
            x ^= y; // sum without carries // @viz step
            y = carry; // @viz step
        }
        return (int)x; // @viz return
    }
};
