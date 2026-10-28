class Solution {
    public int reverse(int x) {
        String s = new StringBuilder(String.valueOf(Math.abs((long) x))).reverse().toString();
        long rev = Long.parseLong(s); // "021" -> 21
        if (x < 0) rev = -rev;
        return (rev < Integer.MIN_VALUE || rev > Integer.MAX_VALUE) ? 0 : (int) rev;
    }
}
