class Solution {
    public double myPow(double x, int n) {
        return Math.pow(x, n); // n is widened to double, so -2^31 is fine
    }
}
