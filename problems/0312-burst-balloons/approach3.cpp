#include <algorithm>
#include <vector>
class Solution {
public:
    int maxCoins(std::vector<int>& nums) {
        std::vector<int> a{1}; // padding: the ends act like balloons worth 1 that never burst // @viz init
        a.insert(a.end(), nums.begin(), nums.end()); // @viz init
        a.push_back(1); // @viz init
        const int m = a.size(); // @viz init
        std::vector<std::vector<int>> dp(m, std::vector<int>(m, 0)); // dp[lo][hi] = the most coins from the balloons strictly between lo and hi // @viz init
        for (int gap = 2; gap < m; ++gap) // short intervals first, so the parts are ready // @viz gap
            for (int lo = 0; lo + gap < m; ++lo) { // @viz gap
                int hi = lo + gap; // @viz gap
                for (int k = lo + 1; k < hi; ++k) // k is burst last // @viz last
                    dp[lo][hi] = std::max(dp[lo][hi], dp[lo][k] + a[lo] * a[k] * a[hi] + dp[k][hi]); // @viz last
            }
        return dp[0][m - 1]; // @viz return
    }
};
