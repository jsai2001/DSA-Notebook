class Solution {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) return "0"; // anything times 0 is "0", not "000" // @viz zero
        String total = "0"; // @viz init
        for (int k = 0; k < num2.length(); k++) { // one digit of num2 at a time, from the right // @viz digit
            int d = num2.charAt(num2.length() - 1 - k) - '0'; // @viz digit
            if (d == 0) continue; // a zero digit adds nothing // @viz digit
            String row = timesDigit(num1, d) + "0".repeat(k); // num1 × digit, shifted k places // @viz row
            total = add(total, row); // @viz add
        }
        return total; // @viz return
    }

    private String timesDigit(String num, int d) { // a whole number times one digit (1-9)
        StringBuilder out = new StringBuilder();
        int carry = 0;
        for (int i = num.length() - 1; i >= 0; i--) {
            int p = (num.charAt(i) - '0') * d + carry;
            out.append(p % 10);
            carry = p / 10;
        }
        if (carry > 0) out.append(carry);
        return out.reverse().toString();
    }

    private String add(String a, String b) { // two numbers as strings (Add Strings, LeetCode 415)
        StringBuilder out = new StringBuilder();
        int carry = 0;
        for (int i = a.length() - 1, j = b.length() - 1; i >= 0 || j >= 0 || carry > 0; i--, j--) {
            int s = carry + (i >= 0 ? a.charAt(i) - '0' : 0) + (j >= 0 ? b.charAt(j) - '0' : 0);
            out.append(s % 10);
            carry = s / 10;
        }
        return out.reverse().toString();
    }
}
