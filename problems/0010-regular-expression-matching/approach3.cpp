#include <string>
#include <vector>
class Solution {
public:
    bool isMatch(std::string s, std::string p) {
        int m = s.size(), n = p.size(); // @viz init
        // dp[i][j]: does s[0..i) (first i chars) match p[0..j)?
        std::vector<std::vector<bool>> dp(m + 1, std::vector<bool>(n + 1, false)); // @viz init
        dp[0][0] = true; // empty matches empty // @viz init
        for (int j = 2; j <= n; ++j) { // @viz empty
            if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2]; // "a*b*" can match "" // @viz empty
        }
        for (int i = 1; i <= m; ++i) { // @viz cell
            for (int j = 1; j <= n; ++j) { // @viz cell
                if (p[j - 1] == '*') { // @viz star
                    bool zero = dp[i][j - 2]; // "x*" used zero times // @viz star
                    bool more = (p[j - 2] == s[i - 1] || p[j - 2] == '.') && dp[i - 1][j]; // one more x // @viz star
                    dp[i][j] = zero || more; // @viz star
                } else {
                    dp[i][j] = (p[j - 1] == s[i - 1] || p[j - 1] == '.') && dp[i - 1][j - 1]; // @viz single
                }
            }
        }
        return dp[m][n]; // @viz return
    }
};
