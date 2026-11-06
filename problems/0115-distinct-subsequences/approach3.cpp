#include <string>
#include <vector>
class Solution {
public:
    int numDistinct(std::string s, std::string t) {
        size_t n = t.size(); // @viz init
        // unsigned: the counts on the way can pass the int range even when the answer doesn't.
        // Unsigned overflow wraps modulo 2^32, and only additions happen, so the final answer still comes out exact.
        std::vector<unsigned> dp(n + 1, 0); // one row: dp[j] = ways to spell t[:j] with the letters of s seen so far // @viz init
        dp[0] = 1; // @viz init
        for (char ch : s) { // @viz loop
            for (size_t j = n; j >= 1; --j) { // right to left, so dp[j - 1] still holds the value from before this letter // @viz loop
                if (t[j - 1] == ch) dp[j] += dp[j - 1]; // @viz use
            }
        }
        return (int)dp[n]; // @viz answer
    }
};
