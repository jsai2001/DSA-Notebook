#include <vector>
class Solution {
public:
    int change(int amount, std::vector<int>& coins) {
        // memo[i][rem] = ways to make rem using coins[i..]
        memo.assign(coins.size(), std::vector<unsigned>(amount + 1, 0)); // @viz init
        known.assign(coins.size(), std::vector<bool>(amount + 1, false)); // @viz init
        return ways(0, amount, coins); // @viz return
    }
private:
    // unsigned: some sub-results overflow even when the answer fits;
    // unsigned wraps safely and the final sum is still right.
    std::vector<std::vector<unsigned>> memo;
    std::vector<std::vector<bool>> known;
    unsigned ways(int i, int rem, std::vector<int>& coins) { // @viz call
        if (rem == 0) return 1; // @viz done
        if (rem < 0 || i == (int)coins.size()) return 0; // @viz dead
        if (known[i][rem]) return memo[i][rem]; // @viz hit
        // take coins[i] (and stay on it), or skip to the next coin
        memo[i][rem] = ways(i, rem - coins[i], coins) + ways(i + 1, rem, coins); // @viz split
        known[i][rem] = true; // @viz store
        return memo[i][rem]; // @viz store
    }
};
