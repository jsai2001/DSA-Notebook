class Solution {
    public int hammingWeight(int n) {
        int count = 0; // @viz init
        while (n != 0) { // stop once no 1 bits are left // @viz loop
            count += n & 1; // the lowest bit // @viz test
            n >>>= 1; // >>> fills with 0, so this ends even for a negative n // @viz shift
        }
        return count; // @viz return
    }
}
