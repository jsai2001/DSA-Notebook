#include <string>
#include <vector>
class Solution {
public:
    int numDistinct(std::string s, std::string t) {
        size_t m = s.size(), n = t.size(); // @viz init
        // dp[i][j]: ways to spell the first j letters of t using the first i letters of s.
        // unsigned: values on the way can pass the int range even when the answer doesn't; unsigned overflow wraps
        // modulo 2^32 (signed overflow is undefined), and with only additions the final answer still comes out exact.
        std::vector<std::vector<unsigned>> dp(m + 1, std::vector<unsigned>(n + 1, 0)); // @viz init
        for (size_t i = 0; i <= m; ++i) dp[i][0] = 1; // the empty start of t: one way (use nothing) // @viz init
        for (size_t i = 1; i <= m; ++i) { // @viz loop
            for (size_t j = 1; j <= n; ++j) { // @viz loop
                dp[i][j] = dp[i - 1][j]; // don't use s[i-1] // @viz skip
                if (s[i - 1] == t[j - 1]) dp[i][j] += dp[i - 1][j - 1]; // use s[i-1] as the j-th letter of t // @viz use
            }
        }
        return (int)dp[m][n]; // @viz answer
    }
};
