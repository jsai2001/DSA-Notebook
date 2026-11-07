#include <algorithm>
#include <vector>
class Solution {
public:
    int maxProfit(std::vector<int>& prices) {
        const int n = prices.size(); // @viz init
        std::vector<int> hold(n), sold(n), rest(n); // the best money at the end of day i: holding / just sold / free // @viz init
        hold[0] = -prices[0]; // @viz init
        for (int i = 1; i < n; ++i) { // @viz day
            hold[i] = std::max(hold[i - 1], rest[i - 1] - prices[i]); // keep holding, or buy today (only from rest) // @viz day
            sold[i] = hold[i - 1] + prices[i]; // sell what you held // @viz day
            rest[i] = std::max(rest[i - 1], sold[i - 1]); // stay out, or yesterday was the sale (cooldown ends) // @viz day
        }
        return std::max(sold[n - 1], rest[n - 1]); // end without a share // @viz return
    }
};
