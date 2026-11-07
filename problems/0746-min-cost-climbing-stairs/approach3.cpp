#include <algorithm>
#include <vector>
class Solution {
public:
    int minCostClimbingStairs(std::vector<int>& cost) {
        int two = 0, one = 0; // the cheapest way to stand two steps below, and one step below // @viz init
        for (size_t i = 2; i <= cost.size(); ++i) { // @viz loop
            int cur = std::min(one + cost[i - 1], two + cost[i - 2]); // @viz choose
            two = one; // @viz choose
            one = cur; // @viz choose
        }
        return one; // @viz return
    }
};
