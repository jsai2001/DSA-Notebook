#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::string> generateParenthesis(int n) {
        std::vector<std::vector<std::string>> dp(n + 1); // dp[k]: every valid string with k pairs // @viz init
        dp[0] = {""}; // 0 pairs -> just "" // @viz init
        for (int k = 1; k <= n; ++k) { // @viz size
            for (int c = 0; c < k; ++c) { // c pairs inside the first "( )", the other k - 1 - c after it // @viz split
                for (const std::string& inside : dp[c]) // @viz combine
                    for (const std::string& after : dp[k - 1 - c]) // @viz combine
                        dp[k].push_back("(" + inside + ")" + after); // @viz combine
            }
        }
        return dp[n]; // @viz return
    }
};
