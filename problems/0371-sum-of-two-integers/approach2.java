class Solution {
    public int getSum(int a, int b) {
        if (b == 0) return a; // no carry left // @viz init, return
        return getSum(a ^ b, (a & b) << 1); // sum without carries, and the carries one place up // @viz step
    }
}
