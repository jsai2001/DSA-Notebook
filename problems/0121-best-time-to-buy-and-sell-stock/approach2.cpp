#include <algorithm>
#include <vector>
class Solution {
public:
    int maxProfit(std::vector<int>& prices) {
        int best = 0; // @viz init
        size_t buy = 0; // the buy day: the cheapest day seen so far // @viz init
        for (size_t sell = 1; sell < prices.size(); ++sell) { // the sell day moves right one day at a time // @viz sell
            if (prices[sell] < prices[buy]) { // a cheaper day: buying here beats any earlier buy // @viz move
                buy = sell; // @viz move
            } else { // @viz profit
                best = std::max(best, prices[sell] - prices[buy]); // @viz profit
            }
        }
        return best; // @viz return
    }
};
