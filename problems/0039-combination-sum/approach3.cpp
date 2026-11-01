#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> combinationSum(std::vector<int>& candidates, int target) {
        std::vector<std::vector<std::vector<int>>> dp(target + 1); // dp[t]: every combination that adds up to t // @viz init
        dp[0] = {{}}; // one way to make 0: take nothing // @viz init
        for (int c : candidates) { // candidates in the outer loop, so each combination is built in one order // @viz coin
            for (int t = c; t <= target; ++t) { // @viz amount
                for (const std::vector<int>& combo : dp[t - c]) { // every way to make t - c, plus one more c // @viz extend
                    std::vector<int> longer = combo; // @viz extend
                    longer.push_back(c); // @viz extend
                    dp[t].push_back(longer); // @viz extend
                }
            }
        }
        return dp[target]; // @viz return
    }
};
