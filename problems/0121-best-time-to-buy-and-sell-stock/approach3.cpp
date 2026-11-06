#include <algorithm>
#include <climits>
#include <vector>
class Solution {
public:
    int maxProfit(std::vector<int>& prices) {
        int lowest = INT_MAX; // the cheapest price before today // @viz init
        int best = 0; // @viz init
        for (int p : prices) { // @viz loop
            best = std::max(best, p - lowest); // sell today, having bought at the cheapest day before (day 0: p - INT_MAX is negative, no overflow) // @viz profit
            lowest = std::min(lowest, p); // today may be the cheapest day for later sales // @viz low
        }
        return best; // @viz return
    }
};
