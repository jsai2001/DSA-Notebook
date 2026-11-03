class Solution {
    public int[] plusOne(int[] digits) {
        int[] result = digits.clone(); // a copy, so the caller's array isn't changed // @viz init
        int carry = 1; // adding one is a carry of 1 into the last digit // @viz init
        for (int i = result.length - 1; i >= 0; i--) { // right to left, like adding on paper // @viz loop
            int total = result[i] + carry; // @viz loop
            result[i] = total % 10; // @viz loop
            carry = total / 10; // 1 only when total was 10 // @viz loop
        }
        if (carry > 0) { // a carry out of the first digit: every digit was 9 // @viz grow
            int[] longer = new int[result.length + 1]; // @viz grow
            longer[0] = carry; // @viz grow
            System.arraycopy(result, 0, longer, 1, result.length); // @viz grow
            result = longer; // @viz grow
        }
        return result; // @viz return
    }
}
