#include <algorithm>
#include <string>
#include <vector>
class Solution {
public:
    int minDistance(std::string word1, std::string word2) {
        int m = (int)word1.size(), n = (int)word2.size(); // @viz init
        // dp[i][j]: edits to turn the first i letters of word1 into the first j letters of word2
        std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0)); // @viz init
        for (int i = 0; i <= m; ++i) dp[i][0] = i; // into "": delete all i letters // @viz base
        for (int j = 0; j <= n; ++j) dp[0][j] = j; // from "": insert all j letters // @viz base
        for (int i = 1; i <= m; ++i) { // @viz fill
            for (int j = 1; j <= n; ++j) { // @viz fill
                if (word1[i - 1] == word2[j - 1]) { // same last letter: no edit for it // @viz same
                    dp[i][j] = dp[i - 1][j - 1]; // @viz same
                } else { // @viz edit
                    dp[i][j] = 1 + std::min({dp[i - 1][j - 1], // replace // @viz edit
                                             dp[i - 1][j], // delete word1's letter // @viz edit
                                             dp[i][j - 1]}); // insert word2's letter // @viz edit
                }
            }
        }
        return dp[m][n]; // @viz answer
    }
};
