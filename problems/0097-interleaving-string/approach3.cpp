#include <string>
#include <vector>
class Solution {
public:
    bool isInterleave(std::string s1, std::string s2, std::string s3) {
        size_t m = s1.size(), n = s2.size(); // @viz init
        if (m + n != s3.size()) return false; // the letters have to add up // @viz len
        std::vector<bool> dp(n + 1, false); // one row of the table; dp[j] is row i once row i is done // @viz init
        for (size_t i = 0; i <= m; ++i) { // @viz loop
            for (size_t j = 0; j <= n; ++j) { // @viz loop
                if (i == 0 && j == 0) { // @viz init
                    dp[j] = true; // @viz init
                    continue; // @viz init
                }
                bool from1 = i > 0 && dp[j] && s1[i - 1] == s3[i + j - 1]; // dp[j] still holds the row above // @viz from1
                bool from2 = j > 0 && dp[j - 1] && s2[j - 1] == s3[i + j - 1]; // dp[j - 1] is already this row // @viz from2
                dp[j] = from1 || from2; // @viz store
            }
        }
        return dp[n]; // @viz answer
    }
};
