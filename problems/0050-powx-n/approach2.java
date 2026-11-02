class Solution {
    public double myPow(double x, int n) {
        long N = n; // long: -(-2^31) doesn't fit in an int // @viz flip
        if (N < 0) { // x^-n = (1/x)^n // @viz flip
            x = 1 / x; // @viz flip
            N = -N; // @viz flip
        }
        return power(x, N); // @viz start
    }

    private double power(double x, long n) { // x^n for n >= 0 // @viz call
        if (n == 0) return 1.0; // @viz base
        double half = power(x, n / 2); // x^(n / 2), computed once and reused // @viz half
        if (n % 2 == 0) return half * half; // @viz even, odd
        return half * half * x; // odd n: one extra x // @viz odd
    }
}
