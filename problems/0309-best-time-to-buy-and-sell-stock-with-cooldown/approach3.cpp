#include <algorithm>
#include <vector>
class Solution {
public:
    int maxProfit(std::vector<int>& prices) {
        int hold = -prices[0], sold = 0, rest = 0; // the three states after day 0 // @viz init
        for (size_t i = 1; i < prices.size(); ++i) { // @viz day
            int h = std::max(hold, rest - prices[i]); // all from yesterday's values // @viz day
            int s = hold + prices[i]; // @viz day
            rest = std::max(rest, sold); // @viz day
            hold = h; // @viz day
            sold = s; // @viz day
        }
        return std::max(sold, rest); // @viz return
    }
};
