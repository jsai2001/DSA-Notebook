class Solution {
    public int reverseBits(int n) {
        String bits = String.format("%32s", Integer.toBinaryString(n)).replace(' ', '0'); // exactly 32 digits, leading zeros kept // @viz text
        String back = new StringBuilder(bits).reverse().toString(); // read the digits backwards // @viz back
        return Integer.parseUnsignedInt(back, 2); // @viz back
    }
}
