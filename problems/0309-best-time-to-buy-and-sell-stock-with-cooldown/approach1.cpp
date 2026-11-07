#include <algorithm>
#include <vector>
class Solution {
public:
    int maxProfit(std::vector<int>& prices) {
        memo.assign(prices.size(), {-1, -1}); // memo[i][holding], -1 = not yet // @viz init
        return best(prices, 0, 0); // @viz return
    }
private:
    std::vector<std::vector<int>> memo;
    int best(const std::vector<int>& p, int i, int holding) { // the most profit from day i on, holding a share or not // @viz call
        if (i >= (int)p.size()) return 0; // no days left // @viz base
        int& m = memo[i][holding]; // @viz memo
        if (m >= 0) return m; // @viz memo
        if (holding) m = std::max(p[i] + best(p, i + 2, 0), best(p, i + 1, 1)); // sell today (then cool down: skip to i + 2), or keep holding // @viz sell
        else m = std::max(-p[i] + best(p, i + 1, 1), best(p, i + 1, 0)); // buy today, or wait // @viz buy
        return m; // @viz memo
    }
};
