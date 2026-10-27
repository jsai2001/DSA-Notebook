#include <vector>
class Solution {
public:
    int change(int amount, std::vector<int>& coins) {
        int n = coins.size(); // @viz init
        // dp[i][a] = ways to make a using only the first i coins.
        // unsigned: some cells overflow even when the answer fits; it wraps safely.
        std::vector<std::vector<unsigned>> dp(n + 1, std::vector<unsigned>(amount + 1, 0)); // @viz init
        dp[0][0] = 1; // one way to make 0: use nothing // @viz init
        for (int i = 1; i <= n; ++i) { // @viz row
            int coin = coins[i - 1]; // @viz row
            for (int a = 0; a <= amount; ++a) { // @viz cell
                dp[i][a] = dp[i - 1][a]; // skip this coin // @viz skip
                if (a >= coin) { // @viz take
                    dp[i][a] += dp[i][a - coin]; // use it at least once // @viz take
                }
            }
        }
        return dp[n][amount]; // @viz return
    }
};
