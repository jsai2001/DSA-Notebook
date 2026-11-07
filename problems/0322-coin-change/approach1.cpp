#include <algorithm>
#include <climits>
#include <vector>
class Solution {
public:
    int coinChange(std::vector<int>& coins, int amount) {
        c = coins; // @viz init
        memo.assign(amount + 1, -2); // -2 = not worked out yet, -1 = impossible // @viz init
        return fewest(amount); // @viz return
    }
private:
    std::vector<int> c, memo;
    int fewest(int a) { // the fewest coins that add up to a, or -1 // @viz call
        if (a == 0) return 0; // @viz base
        if (memo[a] != -2) return memo[a]; // @viz memo
        int best = INT_MAX; // @viz try
        for (int coin : c) // the last coin is one of coins // @viz try
            if (coin <= a) { // @viz try
                int r = fewest(a - coin); // @viz try
                if (r >= 0) best = std::min(best, r + 1); // @viz try
            }
        return memo[a] = best == INT_MAX ? -1 : best; // @viz memo
    }
};
