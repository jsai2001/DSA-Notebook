#include <algorithm>
#include <vector>
class Solution {
public:
    int minCostClimbingStairs(std::vector<int>& cost) {
        memo.assign(cost.size() + 1, -1); // @viz init
        return reach(cost, cost.size()); // @viz return
    }
private:
    std::vector<int> memo;
    int reach(const std::vector<int>& cost, int i) { // the cheapest way to stand on step i (step n is the top) // @viz call
        if (i <= 1) return 0; // you may start on step 0 or step 1 for free // @viz base
        if (memo[i] < 0) // @viz memo
            memo[i] = std::min(reach(cost, i - 1) + cost[i - 1], reach(cost, i - 2) + cost[i - 2]); // come from one step below, or two // @viz choose
        return memo[i]; // @viz memo
    }
};
