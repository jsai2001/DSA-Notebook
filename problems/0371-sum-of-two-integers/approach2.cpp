class Solution {
    unsigned add(unsigned x, unsigned y) { // @viz init
        if (y == 0) return x; // no carry left // @viz return
        return add(x ^ y, (x & y) << 1); // sum without carries, and the carries one place up // @viz step
    }
public:
    int getSum(int a, int b) {
        return (int)add(a, b); // unsigned: shifting a carry out of bit 31 is well defined // @viz init, return
    }
};
