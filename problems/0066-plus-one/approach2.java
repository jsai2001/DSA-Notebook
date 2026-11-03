class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) { // right to left // @viz loop
            if (digits[i] < 9) { // this digit can take the 1 without carrying // @viz stop
                digits[i]++; // @viz stop
                return digits; // nothing to the left changes // @viz stop
            }
            digits[i] = 0; // 9 + 1 = 10: write 0 and carry 1 to the left // @viz nine
        }
        int[] result = new int[digits.length + 1]; // every digit was 9: 99...9 + 1 = 100...0 // @viz grow
        result[0] = 1; // the rest are already 0 // @viz grow
        return result; // @viz grow
    }
}
