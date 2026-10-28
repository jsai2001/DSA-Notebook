class Solution {
    public int reverse(int x) {
        // long throughout: Math.abs(Integer.MIN_VALUE) is still negative as an
        // int, and the reversed number can be too big before the range check.
        long rev = 0; // @viz init
        long n = Math.abs((long) x); // @viz sign
        boolean positive = x >= 0; // @viz sign
        int decimal = String.valueOf(n).length() - 1; // @viz digits
        long place = 1; // 10^decimal
        for (int k = 0; k < decimal; k++) place *= 10; // @viz digits
        while (decimal != 0) { // @viz loop
            rev += (n % 10) * place; // @viz place
            decimal--; // @viz next
            place /= 10; // @viz next
            n /= 10; // @viz next
        }
        rev += n; // @viz last
        if (!positive) rev = -rev; // @viz restore
        if (rev < Integer.MIN_VALUE || rev > Integer.MAX_VALUE) // @viz check
            return 0; // @viz overflow
        return (int) rev; // @viz return
    }
}
