#include <algorithm>
#include <string>
#include <vector>
class Solution {
public:
    int longestCommonSubsequence(std::string text1, std::string text2) {
        const int m = text1.size(), n = text2.size(); // @viz init
        std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0)); // dp[i][j] = LCS of the first i letters and the first j letters // @viz init
        for (int i = 1; i <= m; ++i) // @viz row
            for (int j = 1; j <= n; ++j) // @viz cell
                if (text1[i - 1] == text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1; // the last letters match: extend the diagonal // @viz same
                else dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]); // drop the last letter of one of them // @viz diff
        return dp[m][n]; // @viz return
    }
};
