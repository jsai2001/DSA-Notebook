class Solution {
    public int[] plusOne(int[] digits) {
        int n = digits.length; // @viz find
        int k = n - 1; // @viz find
        while (k >= 0 && digits[k] == 9) k--; // skip the run of 9s at the end // @viz find
        if (k < 0) { // all 9s // @viz grow
            int[] result = new int[n + 1]; // @viz grow
            result[0] = 1; // @viz grow
            return result; // @viz grow
        }
        // digits[k] is the last digit that isn't 9: it goes up by one, and the 9s after it become 0
        int[] result = new int[n]; // new arrays start as all 0s // @viz build
        System.arraycopy(digits, 0, result, 0, k); // @viz build
        result[k] = digits[k] + 1; // @viz build
        return result; // @viz build
    }
}
