class Solution {
    public int reverse(int x) {
        int rev = 0; // @viz init
        while (x != 0) { // @viz loop
            int digit = x % 10; // pop the last digit (negative when x < 0) // @viz pop
            x /= 10; // @viz pop
            // Would rev * 10 + digit leave the int range? Check before building it.
            if (rev > Integer.MAX_VALUE / 10 || (rev == Integer.MAX_VALUE / 10 && digit > 7)) return 0; // @viz check, overflow
            if (rev < Integer.MIN_VALUE / 10 || (rev == Integer.MIN_VALUE / 10 && digit < -8)) return 0; // @viz check, overflow
            rev = rev * 10 + digit; // push it onto rev // @viz push
        }
        return rev; // @viz return
    }
}
