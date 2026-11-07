class Solution {
    public int getSum(int a, int b) {
        while (b != 0) { // until no carry is left // @viz init, loop
            int carry = (a & b) << 1; // the carries, one place up // @viz step
            a ^= b; // sum without carries // @viz step
            b = carry; // @viz step
        }
        return a; // @viz return
    }
}
