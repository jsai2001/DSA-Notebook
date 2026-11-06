#include <string>
#include <vector>
class Solution {
public:
    bool isInterleave(std::string s1, std::string s2, std::string s3) {
        size_t m = s1.size(), n = s2.size(); // @viz init
        if (m + n != s3.size()) return false; // the letters have to add up // @viz len
        // dp[i][j]: can the first i letters of s1 and the first j of s2 make the first i + j of s3?
        std::vector<std::vector<bool>> dp(m + 1, std::vector<bool>(n + 1, false)); // @viz init
        dp[0][0] = true; // nothing from either makes the empty start // @viz init
        for (size_t i = 0; i <= m; ++i) { // @viz loop
            for (size_t j = 0; j <= n; ++j) { // @viz loop
                if (i > 0 && s1[i - 1] == s3[i + j - 1] && dp[i - 1][j]) // the last letter came from s1 // @viz from1
                    dp[i][j] = true; // @viz from1
                if (j > 0 && s2[j - 1] == s3[i + j - 1] && dp[i][j - 1]) // or from s2 // @viz from2
                    dp[i][j] = true; // @viz from2
            }
        }
        return dp[m][n]; // @viz answer
    }
};
