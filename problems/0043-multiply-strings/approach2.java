class Solution {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) return "0"; // anything times 0 is "0", not "000" // @viz zero
        int m = num1.length(), n = num2.length();
        int[] pos = new int[m + n]; // the product has at most m + n digits; pos[0] is the leftmost // @viz init
        for (int i = m - 1; i >= 0; i--) { // @viz mul
            for (int j = n - 1; j >= 0; j--) { // @viz mul
                // num1[i] × num2[j] lands on places i + j and i + j + 1
                int total = (num1.charAt(i) - '0') * (num2.charAt(j) - '0') + pos[i + j + 1]; // @viz mul
                pos[i + j + 1] = total % 10; // keep one digit here // @viz place
                pos[i + j] += total / 10; // carry one place to the left // @viz place
            }
        }
        StringBuilder result = new StringBuilder(); // @viz return
        for (int d : pos) // @viz return
            if (!(result.length() == 0 && d == 0)) result.append(d); // skip the leading zero // @viz return
        return result.toString(); // @viz return
    }
}
