#include <vector>
class Solution {
public:
    int change(int amount, std::vector<int>& coins) {
        // dp[a] = ways to make a. unsigned: some cells overflow even when
        // the answer fits; unsigned wraps safely and dp[amount] is still right.
        std::vector<unsigned> dp(amount + 1, 0); // @viz init
        dp[0] = 1; // one way to make 0: use nothing // @viz init
        for (int coin : coins) { // coins outside, so each combination is counted once // @viz coin
            for (int a = coin; a <= amount; ++a) { // @viz cell
                dp[a] += dp[a - coin]; // add the ways that end with this coin // @viz add
            }
        }
        return dp[amount]; // @viz return
    }
};
