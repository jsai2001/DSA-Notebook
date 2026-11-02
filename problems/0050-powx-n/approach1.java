class Solution {
    public double myPow(double x, int n) {
        long N = n; // long: -(-2^31) doesn't fit in an int // @viz flip
        if (N < 0) { // x^-n = (1/x)^n // @viz flip
            x = 1 / x; // @viz flip
            N = -N; // @viz flip
        }
        double result = 1.0; // @viz init
        for (long i = 0; i < N; i++) result *= x; // multiply by x, n times // @viz loop
        return result; // @viz return
    }
}
