#include <string>
#include <vector>

class Solution {
public:
    std::string longestPalindrome(std::string s) {
        int n = s.size(); // @viz init
        // dp[i][j]: is s[i..j] a palindrome?
        std::vector<std::vector<bool>> dp(n, std::vector<bool>(n, false)); // @viz init
        int start = 0, best = 1; // @viz init
        for (int length = 1; length <= n; ++length) { // @viz cell
            for (int i = 0; i + length <= n; ++i) { // @viz cell
                int j = i + length - 1; // @viz cell
                if (s[i] == s[j] && (length <= 2 || dp[i + 1][j - 1])) { // @viz check
                    dp[i][j] = true; // @viz mark
                    if (length > best) { // @viz best
                        start = i; // @viz best
                        best = length; // @viz best
                    }
                }
            }
        }
        return s.substr(start, best); // @viz return
    }
};
