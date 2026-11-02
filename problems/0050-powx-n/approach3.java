class Solution {
    public double myPow(double x, int n) {
        long N = n; // long: -(-2^31) doesn't fit in an int // @viz flip
        if (N < 0) { // x^-n = (1/x)^n // @viz flip
            x = 1 / x; // @viz flip
            N = -N; // @viz flip
        }
        double result = 1.0; // @viz init
        while (N > 0) { // one round per bit of n, lowest bit first // @viz loop
            if ((N & 1) == 1) result *= x; // this bit is set: x (now x^(2^k)) is part of the answer // @viz bit
            x *= x; // x^(2^k) -> x^(2^(k+1)) // @viz square
            N >>= 1; // @viz square
        }
        return result; // @viz return
    }
}
