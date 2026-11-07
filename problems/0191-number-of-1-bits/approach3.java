class Solution {
    public int hammingWeight(int n) {
        int count = 0; // @viz init
        while (n != 0) { // one round per 1 bit // @viz loop
            n &= n - 1; // n - 1 flips the lowest 1 and the zeros below it; & clears that 1 // @viz clear
            count++; // @viz clear
        }
        return count; // @viz return
    }
}
