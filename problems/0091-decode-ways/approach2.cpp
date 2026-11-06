#include <string>
#include <vector>
class Solution {
public:
    int numDecodings(std::string s) {
        int n = (int)s.size(); // @viz init
        std::vector<int> dp(n + 1, 0); // dp[i] = ways to decode the first i digits // @viz init
        dp[0] = 1; // no digits: one way (decode nothing) // @viz init
        for (int i = 1; i <= n; ++i) { // @viz loop
            if (s[i - 1] != '0') // the last digit alone is a letter (1-9) // @viz one
                dp[i] += dp[i - 1]; // @viz one
            if (i >= 2) { // @viz two
                int two = (s[i - 2] - '0') * 10 + (s[i - 1] - '0'); // @viz two
                if (two >= 10 && two <= 26) dp[i] += dp[i - 2]; // the last two digits are a letter (10-26) // @viz two
            }
        }
        return dp[n]; // @viz answer
    }
};
