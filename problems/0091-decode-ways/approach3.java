class Solution {
    public int numDecodings(String s) {
        int prev2 = 0, prev1 = 1; // dp[i - 2] and dp[i - 1]; start: dp[-1] (unused) = 0, dp[0] = 1 // @viz init
        for (int i = 1; i <= s.length(); i++) { // @viz loop
            int cur = 0; // @viz loop
            if (s.charAt(i - 1) != '0') // the last digit alone is a letter (1-9) // @viz one
                cur += prev1; // @viz one
            if (i >= 2) { // @viz two
                int two = (s.charAt(i - 2) - '0') * 10 + (s.charAt(i - 1) - '0'); // @viz two
                if (two >= 10 && two <= 26) cur += prev2; // the last two digits are a letter (10-26) // @viz two
            }
            prev2 = prev1; // slide: only the last two values are ever needed // @viz shift
            prev1 = cur; // @viz shift
        }
        return prev1; // @viz answer
    }
}
