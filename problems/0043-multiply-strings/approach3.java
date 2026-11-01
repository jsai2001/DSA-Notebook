class Solution {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) return "0"; // anything times 0 is "0", not "000" // @viz zero
        int m = num1.length(), n = num2.length(); // @viz init
        int[] col = new int[m + n]; // col[k]: sum of every digit product whose places add up to k (ones = 0) // @viz init
        for (int i = 0; i < m; i++) // @viz sum
            for (int j = 0; j < n; j++) // @viz sum
                col[i + j] += (num1.charAt(m - 1 - i) - '0') * (num2.charAt(n - 1 - j) - '0'); // no carrying yet; at most 81 × 200 // @viz sum
        int carry = 0; // @viz carry
        for (int k = 0; k < m + n; k++) { // one carry pass, from the ones place up // @viz carry
            int v = col[k] + carry; // @viz carry
            col[k] = v % 10; // @viz carry
            carry = v / 10; // @viz carry
        }
        int top = m + n - 1; // @viz trim
        while (col[top] == 0) top--; // drop the unused top place // @viz trim
        StringBuilder result = new StringBuilder(); // @viz return
        for (int k = top; k >= 0; k--) result.append(col[k]); // most significant first // @viz return
        return result.toString(); // @viz return
    }
}
