class Solution {
    public int numDecodings(String s) {
        int n = s.length(); // @viz init
        int[] dp = new int[n + 1]; // dp[i] = ways to decode the first i digits // @viz init
        dp[0] = 1; // no digits: one way (decode nothing) // @viz init
        for (int i = 1; i <= n; i++) { // @viz loop
            if (s.charAt(i - 1) != '0') // the last digit alone is a letter (1-9) // @viz one
                dp[i] += dp[i - 1]; // @viz one
            if (i >= 2) { // @viz two
                int two = (s.charAt(i - 2) - '0') * 10 + (s.charAt(i - 1) - '0'); // @viz two
                if (two >= 10 && two <= 26) dp[i] += dp[i - 2]; // the last two digits are a letter (10-26) // @viz two
            }
        }
        return dp[n]; // @viz answer
    }
}
