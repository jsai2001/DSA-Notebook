#include <algorithm>
#include <vector>
class Solution {
public:
    int maxProfit(std::vector<int>& prices) {
        int best = 0; // not trading at all makes 0 // @viz init
        for (size_t i = 0; i < prices.size(); ++i) // buy on day i // @viz buy
            for (size_t j = i + 1; j < prices.size(); ++j) // sell on a later day j // @viz sell
                best = std::max(best, prices[j] - prices[i]); // @viz profit
        return best; // @viz return
    }
};
